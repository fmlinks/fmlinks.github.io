/* Exercise the actual built site in Chromium; no production files are modified. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/fengminglin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(process.argv[2]);
const out = path.resolve(process.argv[3]);
fs.mkdirSync(out, {recursive:true});
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf','.zip':'application/zip'};
const server = http.createServer((req,res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://local').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) {res.writeHead(403);res.end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404);res.end('Not found');return;}
  res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

const receipt = {status:'running',local_preview:root,checks:[],errors:[],screenshots:[]};
function passed(name, detail) {
  receipt.checks.push({name,detail});console.log('PASS',name,JSON.stringify(detail));
  fs.writeFileSync(path.join(out,'browser_validation.json'),JSON.stringify(receipt,null,2));
}

async function main() {
  await new Promise(resolve=>server.listen(8790,'127.0.0.1',resolve));
  const base = 'http://127.0.0.1:8790';
  const browser = await chromium.launch({headless:true,channel:'chrome'});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
    const page = await context.newPage();
    const pageErrors=[];
    page.on('pageerror',e=>pageErrors.push(e.message));
    page.on('response',response=>{if(response.status()>=400 && response.url().includes('/assets/generative-ai/'))pageErrors.push(response.status()+' '+response.url());});
    // Data-mapping passes intentionally avoid async math replacement. The final
    // screenshot pass below loads real MathJax separately.
    await page.route('**/mathjax@*/**',route=>route.fulfill({contentType:'application/javascript',body:''}));
    for (const lang of ['en','zh']) {
      const prefix = '/library/generative-ai/' + (lang==='zh'?'zh/':'');
      const data = JSON.parse(fs.readFileSync(path.join(root,`assets/generative-ai/data/papers.${lang}.json`),'utf8'));
      const map = new Map(data.map(p=>[p.key,p]));
      assert.equal(data.length,383);
      assert.equal(new Set(data.map(p=>p.key)).size,383);
      assert(data.every(p=>p.title && p.abstract && p.url.startsWith('https://')));
      if(lang==='zh') assert(data.every(p=>/[\u3400-\u9fff]/.test(p.title) && /[\u3400-\u9fff]/.test(p.abstract)));
      assert(!data.some(p=>p.abstract.includes('this https URL')));
      const response = await page.goto(base+prefix,{waitUntil:'networkidle'});
      const builtHTML = await response.text();
      assert.equal((builtHTML.match(/<html\b/gi)||[]).length,1,'One document, no inherited Library wrapper');
      assert.equal((builtHTML.match(/<head\b/gi)||[]).length,1);
      assert(!builtHTML.includes('/assets/css/main.css'));
      await page.waitForSelector('.paper-row');
      assert.equal(await page.locator('.dimension-tab').count(),8);
      assert.equal(await page.locator('.subtask-panel').count(),27);
      assert.equal(await page.locator('.table-wrap table').count(),4);
      assert.equal(await page.locator('.reference-list li').count(),421);
      const prose = await page.locator('[data-prose]').evaluateAll(nodes=>nodes.map(n=>n.dataset.prose));
      assert.equal(new Set(prose).size,87);
      const parts = await page.locator('main>section').evaluateAll(nodes=>nodes.map(n=>n.id));
      assert.deepEqual(parts,['scope','overview','dimensions','synthesis','medical','agenda','conclusion','papers']);
      passed(`${lang}: complete manuscript structure`,{prose:prose.length,tables:4,figures:38,references:421});

      let positions=0;
      for(let g=1;g<=8;g++) {
        await page.locator(`.dimension-tab[data-dimension="${g}"]`).click();
        const tasks = await page.locator(`#dimension-${g} .subtask-tab`).evaluateAll(nodes=>nodes.map(n=>Number(n.dataset.task)));
        for (const t of tasks) {
          await page.locator(`.subtask-tab[data-task="${t}"]`).click();
          const panel = page.locator(`#subtask-${t}`);
          await panel.locator('[data-timeline][data-loaded=true]').waitFor();
          assert.equal(await panel.locator('.paper-node').count(),20);
          assert.equal(await panel.locator('.timeline-buttons button').count(),20);
          const svgKeys = await panel.locator('.paper-node').evaluateAll(nodes=>nodes.map(n=>n.dataset.paper));
          const buttonKeys = await panel.locator('.timeline-buttons button').evaluateAll(nodes=>nodes.map(n=>n.dataset.paper));
          assert.deepEqual(new Set(svgKeys),new Set(buttonKeys));
          for (const key of buttonKeys) {
            // Trigger the actual SVG label event, including the delegated handler.
            await panel.locator(`.paper-node[data-paper="${key}"]`).evaluate(node=>node.dispatchEvent(new MouseEvent('click',{bubbles:true})));
            await page.waitForFunction(title=>document.querySelector('#paper-dialog-title')?.textContent===title,map.get(key).title);
            assert.equal(await page.locator('.paper-abstract').textContent(),map.get(key).abstract);
            assert.equal(await page.locator('.paper-source a').getAttribute('href'),map.get(key).url);
            await page.locator('#paper-dialog [data-close-dialog]').click();
            await page.waitForFunction(key=>!document.querySelector('#paper-dialog').open && document.activeElement?.dataset.paper===key,key);
            positions++;
          }
          // Keyboard activation of the same source label is independently checked.
          const first = panel.locator('.paper-node').first();
          await first.focus();
          await first.press('Enter');
          await page.locator('#paper-dialog[open] .paper-abstract').waitFor();
          await page.keyboard.press('Escape');
          await first.evaluate(node=>new Promise((resolve,reject)=>{
            const started=performance.now();
            const check=()=>document.activeElement===node?resolve():performance.now()-started>1500?reject(Error('Focus did not return to '+node.dataset.paper+'; active='+document.activeElement?.outerHTML.slice(0,180))):requestAnimationFrame(check);
            check();
          }));
        }
        console.log('Timeline group',lang,g,'positions',positions);
      }
      assert.equal(positions,540);
      passed(`${lang}: every timeline label opens exact complete abstract`,{positions,unique:383,keyboard_timelines:27});

      await page.locator('#paper-search').fill(lang==='zh'?'扩散':'diffusion');
      await page.waitForFunction(()=>!document.querySelector('#result-count').textContent.startsWith('383 /'));
      const searchCount = Number((await page.locator('#result-count').textContent()).split(' / ')[0]);
      assert(searchCount>0 && searchCount<383);
      await page.locator('#paper-search').fill('not-a-real-paper-xyz');
      await page.locator('.empty-results').waitFor();
      await page.locator('#paper-search').fill('');
      await page.locator('#paper-year').selectOption('2026');
      await page.waitForFunction(()=>document.querySelector('.paper-row'));
      assert.equal(Number((await page.locator('#result-count').textContent()).split(' / ')[0]),data.filter(p=>p.date.startsWith('2026')).length);
      await page.locator('#paper-year').selectOption('');
      await page.locator('#paper-task').selectOption('1');
      await page.waitForFunction(()=>document.querySelector('#result-count').textContent.startsWith('20 /'));
      await page.locator('#paper-task').selectOption('');
      await page.locator('#catalog-next').click();
      assert((await page.locator('#catalog-page').textContent()).includes('2 /'));
      passed(`${lang}: catalogue filters and pagination`,{searchCount});

      await page.locator('.dimension-tab[data-dimension="1"]').click();
      await page.locator('.subtask-tab[data-task="1"]').click();
      await page.locator('#dimension-1 .bridge-media summary').click();
      await page.locator('#dimension-1 [data-zoom]').click();
      await page.locator('#image-dialog[open]').waitFor();
      await page.keyboard.press('Escape');
      await page.locator('#subtask-1 .timeline-buttons button').first().click();
      await page.locator('.paper-abstract').waitFor();
      const originalTitle=await page.locator('#paper-dialog-title').textContent();
      await page.locator('#next-paper').click();
      await page.waitForFunction(old=>document.querySelector('#paper-dialog-title').textContent!==old,originalTitle);
      await page.locator('#previous-paper').click();
      await page.waitForFunction(old=>document.querySelector('#paper-dialog-title').textContent===old,originalTitle);
      await page.keyboard.press('Escape');
      const target=await page.locator(`[data-language="${lang==='en'?'zh':'en'}"]`).getAttribute('href');
      assert(target.includes('dimension=1') && target.includes('task=1'));
      passed(`${lang}: zoom, drawer navigation and language state`,{});
      for (const viewport of [{width:1920,height:1080},{width:768,height:1024},{width:390,height:844},{width:360,height:800}]) {
        await page.setViewportSize(viewport);
        const overflow=await page.evaluate(()=>({page:document.documentElement.scrollWidth,view:innerWidth}));
        assert(overflow.page<=overflow.view+1,JSON.stringify({lang,viewport,overflow}));
        if(viewport.width===390) {
          await page.evaluate(()=>window.scrollTo(0,0));
          const shot=path.join(out,`${lang}-mobile-top.png`);
          await page.screenshot({path:shot});receipt.screenshots.push(shot);
          await page.locator('#dimension-1').scrollIntoViewIfNeeded();
          const screenshot=path.join(out,`${lang}-mobile-explorer.png`);
          await page.screenshot({path:screenshot});receipt.screenshots.push(screenshot);
          await page.locator('#subtask-1 .timeline-buttons button').first().click();
          await page.locator('.paper-abstract').waitFor();
          const paperShot=path.join(out,`${lang}-mobile-paper.png`);
          await page.screenshot({path:paperShot});receipt.screenshots.push(paperShot);
          await page.keyboard.press('Escape');
        }
      }
      passed(`${lang}: responsive document widths`,[1920,768,390,360]);
      await page.setViewportSize({width:1440,height:1000});
      await page.evaluate(()=>window.scrollTo(0,0));
      const hero=path.join(out,`${lang}-desktop-top.png`);
      await page.screenshot({path:hero});receipt.screenshots.push(hero);
      await page.locator('#dimension-1').scrollIntoViewIfNeeded();
      const explorer=path.join(out,`${lang}-desktop-explorer.png`);
      await page.screenshot({path:explorer});receipt.screenshots.push(explorer);
      await page.locator('#agenda').scrollIntoViewIfNeeded();
      const agenda=path.join(out,`${lang}-desktop-agenda.png`);
      await page.screenshot({path:agenda});receipt.screenshots.push(agenda);
    }
    assert.deepEqual(pageErrors,[]);
    passed('No browser errors or missing Generative AI assets',{});
    await page.goto(base+'/library/',{waitUntil:'networkidle'});
    assert(await page.locator('a[href="/library/generative-ai/"]').count()>0);
    const card = path.join(out,'library-card.png');
    await page.screenshot({path:card});receipt.screenshots.push(card);
    passed('Library collection card links to live route',{});
    console.log('Starting isolated real-MathJax check');
    const mathPage = await browser.newPage();
    await mathPage.goto(base+'/library/generative-ai/',{waitUntil:'networkidle'});
    await mathPage.waitForFunction(()=>window.MathJax?.startup?.document && [...MathJax.startup.document.math].length>0 && [...MathJax.startup.document.math].every(item=>item.state()>=200),null,{timeout:20000});
    assert(await mathPage.locator('mjx-container').count()>0);
    assert.equal(await mathPage.locator('mjx-merror').count(),0);
    passed('Real MathJax renders manuscript equations without error',{});
    receipt.status='passed';
  } finally {
    await Promise.race([browser.close(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Browser close timeout')),10000))]);
  }
}
main().catch(e=>{receipt.status='failed';receipt.errors.push(e.stack);console.error(e);process.exitCode=1;}).finally(()=>{
  fs.writeFileSync(path.join(out,'browser_validation.json'),JSON.stringify(receipt,null,2));
  server.close();
});
