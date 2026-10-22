const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/fengminglin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const target = process.argv[2];
const out = path.resolve(process.argv[3]);
fs.mkdirSync(out,{recursive:true});
const expected = {
  en:['Scope & Methods','Overview','8 Dimensions, 27 Subtasks','Trends & Evidence','Medical Validation','Research Agenda','Conclusion','References'],
  zh:['范围与方法','总览','八维27项','趋势与证据','医学验证','研究议程','结论','参考文献']
};
const ids=['scope','overview','dimensions','synthesis','medical','agenda','conclusion','references'];
let server;
const receipt={status:'running',target,languages:[]};
async function main() {
  let base=target;
  if(!target.startsWith('https://')) {
    const root=path.resolve(target);
    server=http.createServer((req,res)=>{
      let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));
      if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
      if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
      if(!fs.existsSync(file)){res.writeHead(404);res.end();return;}
      res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');
      fs.createReadStream(file).pipe(res);
    });
    await new Promise(resolve=>server.listen(8792,'127.0.0.1',resolve));
    base='http://127.0.0.1:8792';
  }
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const lang of ['en','zh']) {
      await page.goto(base+'/library/generative-ai/'+(lang==='zh'?'zh/':''),{waitUntil:'networkidle'});
      const labels=await page.locator('.chapter-nav a').evaluateAll(nodes=>nodes.map(node=>{const copy=node.cloneNode(true);copy.querySelector('span')?.remove();return copy.textContent.trim();}));
      assert.deepEqual(labels,expected[lang]);
      assert.deepEqual(await page.locator('.chapter-nav a').evaluateAll(ns=>ns.map(n=>n.hash.slice(1))),ids);
      assert(await page.locator('.chapter-nav .shell').evaluate(n=>n.scrollWidth<=n.clientWidth+1));
      await page.locator('.chapter-nav').screenshot({path:path.join(out,`navigation-${lang}.png`)});
      for(const id of ids) {
        await page.locator(`.chapter-nav a[href="#${id}"]`).click();
        await page.waitForFunction(id=>location.hash==='#'+id,id);
        assert(await page.locator('#'+id).isVisible());
      }
      assert(await page.locator('#references').evaluate(n=>n.open));
      assert((await page.locator('#references').boundingBox()).y>=110);
      const other=lang==='en'?'zh':'en';
      await page.locator(`header [data-language="${other}"]`).click();
      await page.locator('#references[open]').waitFor();
      assert.equal(new URL(page.url()).hash,'#references');
      for(const width of [1600,768,390,360]) {
        await page.setViewportSize({width,height:900});
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      }
      await page.setViewportSize({width:1440,height:1000});
      receipt.languages.push({lang,labels,links:8,references:'opens correct bibliography',language_switch:'preserves reference location',responsive:[1600,1440,768,390,360]});
      console.log('PASS navigation',lang);
    }
    assert.deepEqual(errors,[]);receipt.status='passed';
  } finally {await browser.close();}
}
main().catch(e=>{receipt.status='failed';receipt.error=e.stack;console.error(e);process.exitCode=1;}).finally(()=>{fs.writeFileSync(path.join(out,'navigation_validation.json'),JSON.stringify(receipt,null,2));server?.close();});
