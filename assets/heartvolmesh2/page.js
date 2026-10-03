/* No external runtime dependencies. All scientific media are real mesh exports. */
(() => {
  const reducedQuery=matchMedia('(prefers-reduced-motion: reduce)');
  let reduce=reducedQuery.matches, manualPause=new Set();
  const videos=[...document.querySelectorAll('video')];
  const motionButton=document.getElementById('motion-control');
  const isVisible=v=>!v.closest('[hidden]')&&v.getBoundingClientRect().bottom>0&&v.getBoundingClientRect().top<innerHeight;
  function syncVideos(){videos.forEach(v=>{if(reduce||document.hidden||manualPause.has(v)||!isVisible(v))v.pause();else v.play().catch(()=>{});});}
  function setReduced(value){reduce=value;document.body.classList.toggle('reduced-motion',value);motionButton.setAttribute('aria-pressed',String(value));motionButton.textContent=value?'Enable motion':'Reduce motion';syncVideos();}
  setReduced(reduce);reducedQuery.addEventListener('change',e=>setReduced(e.matches));
  motionButton.addEventListener('click',()=>setReduced(!reduce));
  const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
  const videoObserver=new IntersectionObserver(syncVideos,{threshold:[0,.1,.5]});videos.forEach(v=>videoObserver.observe(v));
  document.addEventListener('visibilitychange',syncVideos);
  document.querySelectorAll('.play-toggle').forEach(button=>{const video=document.getElementById(button.dataset.video);button.addEventListener('click',()=>{if(video.paused){manualPause.delete(video);video.play().catch(()=>{});}else{manualPause.add(video);video.pause();}});const update=()=>{button.textContent=video.paused?'Play ▷':'Pause Ⅱ';button.setAttribute('aria-label',video.paused?'Play cardiac animation':'Pause cardiac animation');};video.addEventListener('play',update);video.addEventListener('pause',update);});
  const tabs=[...document.querySelectorAll('[role=tab]')];
  function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;const panel=document.getElementById(t.dataset.panel);panel.hidden=!selected;if(selected)panel.classList.add('visible');});syncVideos();}
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=tabs[(index+1)%tabs.length];if(event.key==='ArrowLeft')next=tabs[(index+tabs.length-1)%tabs.length];if(event.key==='Home')next=tabs[0];if(event.key==='End')next=tabs[tabs.length-1];if(next){event.preventDefault();selectTab(next);next.focus();}});});
  const progress=document.createElement('div');progress.className='progress-line';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  let scheduled=false;
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{document.documentElement.style.setProperty('--scroll',String(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));syncVideos();scheduled=false;});}},{passive:true});
  document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{if(reduce||e.pointerType==='touch')return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1200px) rotateY(${x*8-4}deg) rotateX(${-y*6+2}deg)`;});card.addEventListener('pointerleave',()=>card.style.transform='');});
  const canvas=document.getElementById('flow'),context=canvas.getContext('2d');let width,height;
  function resize(){const scale=Math.min(devicePixelRatio||1,2);width=innerWidth;height=innerHeight;canvas.width=width*scale;canvas.height=height*scale;context.setTransform(scale,0,0,scale,0,0);}
  resize();addEventListener('resize',resize,{passive:true});
  function draw(time){if(!reduce&&!document.hidden){context.clearRect(0,0,width,height);const t=time*.00012;for(let i=0;i<36;i++){const x=width*(.15+i*.025)+Math.sin(t+i*.31)*70;const y=((i*71+t*55)%(height+200))-100;context.strokeStyle=`rgba(162,213,155,${.025+(i%5)*.008})`;context.lineWidth=1;context.beginPath();context.moveTo(x,y);context.lineTo(x+35,y-70);context.stroke();context.fillStyle='rgba(162,213,155,.3)';context.fillRect(x,y,1.5,1.5);}}requestAnimationFrame(draw);}
  requestAnimationFrame(draw);
})();
