const creativeWorks=[
  {
    "file": "research-poster",
    "title": "Research in one frame",
    "kind": "Research poster",
    "alt": "Purple and black research poster about loneliness and immersive technology, with illustrations and a photograph."
  },
  {
    "file": "colour-moodboard",
    "title": "Colour, type & a little chaos",
    "kind": "Moodboard",
    "alt": "Bright moodboard with orange and yellow colours, playful typefaces, animals and graphic references."
  },
  {
    "file": "arjan-landscape-front",
    "title": "Arjan Brand · The mountains",
    "kind": "Business card",
    "alt": "Photographer Arjan Brand in a mountain landscape on a business card."
  },
  {
    "file": "arjan-jetty-front",
    "title": "Arjan Brand · Into the distance",
    "kind": "Business card",
    "alt": "Business card showing a dark wooden jetty fading into mist."
  },
  {
    "file": "immersive-tech-poster",
    "title": "Immersive Tech Week",
    "kind": "Event poster",
    "alt": "Immersive Tech Week poster with a VR headset, blue code imagery and diagonal white typography."
  },
  {
    "file": "arjan-contact-back",
    "title": "Arjan Brand · The reverse",
    "kind": "Business card",
    "alt": "Black reverse side of a photographer’s business card with contact details and a QR code."
  },
  {
    "file": "arjan-architecture-back",
    "title": "Arjan Brand · A different perspective",
    "kind": "Business card",
    "alt": "White business card with a black and white architectural photograph of a circular staircase."
  },
  {
    "file": "micro-world-illustration",
    "title": "A microscopic world",
    "kind": "Illustration",
    "alt": "Delicate illustrations of small organisms and cells on a dark background."
  },
  {
    "file": "pauze-pixel-art",
    "title": "PAUZE",
    "kind": "Pixel art",
    "alt": "Pixel illustration of a game controller above the purple word PAUZE."
  }
];
const projectData = [
  {
    "id": "anwb",
    "name": "ANWB Problem Checker",
    "year": 2025,
    "doodle": "wrench"
  },
  {
    "id": "bonapoint",
    "name": "BonaPoint",
    "year": 2025,
    "doodle": "flamingo"
  },
  {
    "id": "mos",
    "name": "Moss as a Biosphere",
    "year": 2026,
    "doodle": "leaf"
  },
  {
    "id": "muziekmaatje",
    "name": "Music Buddy",
    "year": 2026,
    "doodle": "music"
  },
  {
    "id": "nen",
    "name": "Internship at NEN",
    "year": 2027,
    "doodle": "spark"
  }
];
/* Instellingen voor volgende aanpassingen met AI. Geen installatie nodig. */
const settings = { cursorTilt: 2.4, cursorTravel: 11, cursorZoom: 0.012, wind: 1 };
const sections = {
  about: { title: 'About me', content: '<p>More coming soon.</p>' },
  projects: { title: 'Projects', content: '<p>More coming soon.</p>' },
  creative: { title: 'Creative', content: '<p>More coming soon.</p>' },
  contact: { title: 'Contact', content: '<p><a href="mailto:lisabrand0719@gmail.com">lisabrand0719@gmail.com</a></p><p><a href="https://www.linkedin.com/in/lisa-brand-65735b3ab/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></p>' }
};

// Een lijntekening opgebouwd uit verbonden takken. Elke tak buigt vanuit zijn
// eigen aanhechtingspunt; kleinere twijgen bewegen meer dan de stam.
const ns = 'http://www.w3.org/2000/svg';
let seed = 7319;
function random() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
function svg(tag, attrs, parent) {
  const element = document.createElementNS(ns, tag);
  Object.entries(attrs).forEach(([key,value]) => element.setAttribute(key, value));
  parent.appendChild(element); return element;
}
const drawing = document.querySelector('#drawing');
const roots = document.querySelector('#roots');
for(let i=0;i<13;i++) {
  const side = i % 2 ? 1 : -1, reach = 32 + random()*140;
  svg('path',{d:`M ${600 + (random()-.5)*11} 770 C ${600+side*18} 800 ${600+side*reach*.6} ${781+random()*18} ${600+side*reach} ${795+random()*16}`,stroke:'#e3eae3','stroke-width':.5+random()*.7,opacity:.16+random()*.24},roots);
}
function limb(parent, length, width, angle, depth, level=0) {
  const joint = svg('g',{transform:`rotate(${angle})`},parent);
  const flex = svg('g',{class:'limb'},joint);
  const amplitude = (level===0 ? .12 : .28 + level*.14)*settings.wind;
  flex.style.setProperty('--a', `${-amplitude*.65}deg`);
  flex.style.setProperty('--b', `${amplitude}deg`);
  flex.style.setProperty('--c', `${-amplitude*.3}deg`);
  flex.style.setProperty('--speed', `${7.5+random()*4}s`);
  flex.style.setProperty('--delay', `${-random()*15}s`);
  const bend = (random()-.5)*length*.33;
  const tip = bend*.55;
  svg('path',{d:`M 0 0 C ${bend} ${-length*.32} ${-bend*.25} ${-length*.76} ${tip} ${-length}`,stroke:level<2?'#e8eee8':'#e2e9e2','stroke-width':width,opacity:level<2?.64:.42+random()*.23},flex);
  if(level<3) svg('path',{d:`M ${width*1.8} 0 C ${bend+width} ${-length*.35} ${-bend*.25+width*.7} ${-length*.76} ${tip+.7} ${-length}`,stroke:'#f0f3ee','stroke-width':.55,opacity:.28},flex);
  if(depth===0) {
    for(let j=0;j<3;j++){
      const y=-length*(.45+j*.2), side=j%2?1:-1, size=5+random()*6;
      svg('path',{d:`M ${tip*.5} ${y} q ${side*size*1.1} ${-size*.3} ${side*size*.8} ${-size*1.7} q ${-side*size*1.1} ${size*.2} ${-side*size*.8} ${size*1.7}`,class:'leaf',opacity:.3+random()*.5},flex);
    }
    return;
  }
  const endpoint=svg('g',{transform:`translate(${tip} ${-length})`},flex);
  if(level===0) {
    limb(endpoint,163,2.3,-40,depth-1,level+1);
    limb(endpoint,184,2.5,5,depth-1,level+1);
    limb(endpoint,153,2.1,49,depth-1,level+1);
  } else {
    limb(endpoint,length*(.67+random()*.13),Math.max(.5,width*.7),-23-random()*23,depth-1,level+1);
    limb(endpoint,length*(.64+random()*.17),Math.max(.5,width*.68),20+random()*27,depth-1,level+1);
    if(level<3) {
      const sidepoint=svg('g',{transform:`translate(${tip*.6} ${-length*.64})`},flex);
      limb(sidepoint,length*.49,Math.max(.5,width*.48),random()>.5?59:-57,depth-2,level+1);
    }
  }
}
limb(svg('g',{transform:'translate(600 775) scale(.82)'},drawing),193,3.1,0,6);

// The contact environment reuses the same white linework, without duplicate IDs.
const contactDrawing = document.querySelector('#contact-drawing');
contactDrawing.appendChild(drawing.firstElementChild.cloneNode(true));
document.querySelector('#about-drawing').appendChild(drawing.firstElementChild.cloneNode(true));

const dialog = document.querySelector('#detail');
document.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => {
  if (['about','contact','projects','creative'].includes(button.dataset.section)) { navigate(button.dataset.section); return; }
  const section = sections[button.dataset.section];
  document.querySelector('#detail-title').textContent = section.title;
  document.querySelector('#detail-content').innerHTML = section.content;
  resetPointer(); dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
});

// Een lichte lens-/camerabeweging: kantelen, verschuiven en een fractie inzoomen.
// De tekst blijft scherp en de knoppen blijven gewone toegankelijke knoppen.
const world = document.querySelector('.world'), backgrounds = document.querySelectorAll('.background-scene');
const motion = document.querySelector('.motion-control');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let enabled=!reduced.matches, targetX=0,targetY=0,x=0,y=0,frame=0;
function resetPointer(){targetX=targetY=0;wake();}
function render(){
  frame=0;x+=(targetX-x)*.055;y+=(targetY-y)*.055;
  const transform=enabled?`translate3d(${x*settings.cursorTravel}px,${y*settings.cursorTravel}px,0) rotateX(${-y*settings.cursorTilt}deg) rotateY(${x*settings.cursorTilt}deg) scale(${1+Math.hypot(x,y)*settings.cursorZoom})`:'';
  backgrounds.forEach(background => background.style.transform=transform);
  // Share the eased camera position with decorative foreground layers only.
  // Body text, headings and navigation never receive these transforms.
  const px=enabled?x:0, py=enabled?y:0;
  world.style.setProperty('--photo-x',`${px*14}px`);
  world.style.setProperty('--photo-y',`${py*10}px`);
  world.style.setProperty('--photo-rx',`${-py*1.6}deg`);
  world.style.setProperty('--photo-ry',`${px*2}deg`);
  world.style.setProperty('--doodle-x',`${px*9}px`);
  world.style.setProperty('--doodle-y',`${py*7}px`);
  if(Math.abs(targetX-x)+Math.abs(targetY-y)>.0005)wake();
}
function wake(){if(!frame)frame=requestAnimationFrame(render);}
world.addEventListener('pointermove', event=>{
  if(!enabled||event.pointerType!=='mouse'||dialog.open)return;
  const r=world.getBoundingClientRect();
  targetX=Math.max(-1,Math.min(1,((event.clientX-r.left)/r.width-.5)*2));
  targetY=Math.max(-1,Math.min(1,((event.clientY-r.top)/r.height-.5)*2));wake();
});
world.addEventListener('pointerleave',resetPointer);
world.addEventListener('pointercancel',resetPointer);
window.addEventListener('blur',resetPointer);
function setMotion(value){
  enabled=value;document.body.classList.toggle('still',!enabled);
  motion.setAttribute('aria-pressed',String(enabled));
  const label=enabled?'Pause motion':'Resume motion';
  motion.setAttribute('aria-label',label);motion.title=label;resetPointer();
  syncAutomaticVideos();
}
function syncAutomaticVideos(){
  document.querySelectorAll('.project-view video[autoplay]').forEach(video=>{
    if(enabled&&!document.hidden&&!video.closest('[inert]'))video.play().catch(()=>{});
    else video.pause();
  });
}
motion.addEventListener('click',()=>setMotion(!enabled));
reduced.addEventListener('change',event=>setMotion(!event.matches));
setMotion(enabled);


// Continuous spatial navigation. Projects lives above-right of Home;
// individual project pages live one step farther to the right.
const views={home:document.querySelector('.home-view'),contact:document.querySelector('.contact-view'),about:document.querySelector('.about-view'),projects:document.querySelector('.projects-view'),project:document.querySelector('.project-view'),creative:document.querySelector('.creative-view')};
const homeButton=document.querySelector('.home-return');
let currentPage='home',currentRoute='',focusTimer,departureTimer;
let projectAnimations=[];
let projectZoomPoint=null;
function resolveRoute(raw){
  if(raw.startsWith('project/')){const item=projectData.find(item=>item.id===raw.slice(8));if(item)return {page:'project',key:'project/'+item.id,item};}
  const page=['home','contact','about','projects','creative'].includes(raw)?raw:'home';return {page,key:page,item:null};
}
function navigate(page){const route=resolveRoute(page);const target='#'+route.key;if(location.hash===target)return;history.pushState({page:route.key},'',target);syncRoute(true);}
function syncRoute(moveFocus=false){
  const route=resolveRoute(location.hash.slice(1));const {page,key,item}=route;
  if(currentRoute===key)return;
  views.project.querySelectorAll('video').forEach(video=>video.pause());
  const previous=currentPage;const inner=page!=='home';
  const openViewer=document.querySelector('#work-viewer');if(openViewer.open)openViewer.close();
  projectAnimations.forEach(animation=>animation.cancel());projectAnimations=[];
  const zoomProject=item || projectData.find(project=>currentRoute==='project/'+project.id);
  const zoomLink=zoomProject?document.querySelector('a[href="#project/'+zoomProject.id+'"] .project-title'):null;
  if(previous==='projects' && page==='project' && zoomLink){const r=zoomLink.getBoundingClientRect();const base=document.querySelector('.projects-scroll').getBoundingClientRect();projectZoomPoint={x:r.left+r.width/2-base.left,y:r.top+r.height/2-base.top};}
  clearTimeout(focusTimer);clearTimeout(departureTimer);
  if(item){
    views.project.dataset.project=item.id;
    document.querySelector('#project-heading').textContent=item.name;
    document.querySelector('#project-year').textContent=String(item.year);
    const art=document.querySelector('.project-detail-doodle');art.setAttribute('data-doodle',item.doodle);paintDoodle(art);
    const caseStudy=document.querySelector('#project-case-study');
    caseStudy.replaceChildren();
    const caseTemplate=document.querySelector('#'+item.id+'-case-study');
    views.project.toggleAttribute('data-case-study',Boolean(caseTemplate));
    if(caseTemplate){
      caseStudy.appendChild(caseTemplate.content.cloneNode(true));
      caseStudy.querySelectorAll('[data-doodle]').forEach(paintDoodle);
      caseStudy.querySelectorAll('video').forEach(video=>{
        const keepSilent=()=>{if(!video.muted)video.muted=true;if(video.volume!==0)video.volume=0;};
        video.defaultMuted=true;keepSilent();video.addEventListener('volumechange',keepSilent);
      });
    }else{
      const placeholder=document.createElement('p');placeholder.className='project-coming-soon';placeholder.textContent='Case study coming soon.';caseStudy.appendChild(placeholder);
    }
    document.querySelector('.project-detail-scroll').scrollTop=0;
  }
  for(const [viewKey,view] of Object.entries(views)){
    view.classList.remove('is-leaving');if(viewKey===previous&&viewKey!==page)view.classList.add('is-leaving');
    view.classList.toggle('is-current',viewKey===page);view.inert=viewKey!==page;
    if(viewKey===page)view.removeAttribute('aria-hidden');else view.setAttribute('aria-hidden','true');
  }
  currentPage=page;currentRoute=key;
  syncAutomaticVideos();
  document.documentElement.dataset.project=page==='project'?item.id:'';
  document.querySelector('meta[name="theme-color"]').content=page==='project'&&item.id==='anwb'?'#081a2c':page==='project'&&item.id==='bonapoint'?'#073c43':page==='project'&&item.id==='mos'?'#0c0e10':page==='project'&&item.id==='muziekmaatje'?'#291722':page==='project'&&item.id==='nen'?'#12475e':'#101f1d';
  for(const name of ['contact','about','projects','project','creative'])world.classList.toggle('is-'+name,page===name);
  world.classList.toggle('is-inner',inner);world.classList.toggle('is-right',page==='projects'||page==='project'||page==='creative');
  document.body.classList.toggle('timeline-open',page==='projects');
  animateProjectTravel(previous,page);
  homeButton.tabIndex=inner?0:-1;homeButton.setAttribute('aria-hidden',String(!inner));
  const titles={home:'Lisa Brand — Portfolio',about:'About me — Lisa Brand',contact:'Contact — Lisa Brand',projects:'Projects — Lisa Brand',creative:'Creative — Lisa Brand'};
  document.title=item?item.name+' — Lisa Brand':titles[page];resetPointer();
  departureTimer=setTimeout(()=>{Object.values(views).forEach(view=>view.classList.remove('is-leaving'));projectAnimations.forEach(animation=>animation.cancel());projectAnimations=[];},reduced.matches?0:1350);
  if(moveFocus){
    const previousSection=previous==='project'?'projects':previous==='home'?'about':previous;
    const focusTarget=inner?document.querySelector('#'+page+'-heading'):document.querySelector('[data-section="'+previousSection+'"]');
    if(document.activeElement&&document.activeElement.closest('.view[inert]'))document.activeElement.blur();
    focusTimer=setTimeout(()=>focusTarget.focus({preventScroll:true}),reduced.matches?0:1250);
  }
}
// Project pages are a separate stage. Zoom into the chosen name rather than
// sliding the page sideways; reverse the camera when returning to the timeline.
function animateProjectTravel(previous,page){
  if(reduced.matches)return;
  const timeline=document.querySelector('.projects-scroll');
  const stage=views.project;
  const entering=previous==='projects'&&page==='project';
  const leaving=previous==='project'&&page==='projects';
  const options={duration:950,easing:'cubic-bezier(.25,.7,.2,1)',fill:'forwards'};
  if(entering||leaving){
    const point=projectZoomPoint||{x:innerWidth*.4,y:innerHeight*.5};
    timeline.style.transformOrigin=point.x+'px '+point.y+'px';
    const frames=entering?[{transform:'scale(1)',opacity:1},{transform:'scale(3.2)',opacity:0}]:[{transform:'scale(3.2)',opacity:0},{transform:'scale(1)',opacity:1}];
    projectAnimations.push(timeline.animate(frames,options));
    const fade=entering?[{opacity:0},{opacity:0,offset:.32},{opacity:1}]:[{opacity:1},{opacity:0,offset:.62},{opacity:0}];
    projectAnimations.push(stage.animate(fade,options));
  }else if(previous==='project'&&page!=='project'){
    projectAnimations.push(stage.animate([{opacity:1},{opacity:0}],{duration:350,fill:'forwards'}));
  }
}
// Conventional mouse wheels also move this canvas horizontally. Trackpads,
// touch gestures, keyboard navigation and the native scrollbar remain usable.
const timelineTrack=document.querySelector('.projects-track');
document.querySelector('.projects-scroll').addEventListener('wheel',event=>{
  if(currentPage!=='projects'||event.ctrlKey)return;
  const factor=event.deltaMode===1?16:event.deltaMode===2?timelineTrack.clientWidth:1;
  const amount=(Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY)*factor;
  if(amount){event.preventDefault();timelineTrack.scrollLeft+=amount;}
},{passive:false});
timelineTrack.addEventListener('keydown',event=>{
  if(event.target!==timelineTrack)return;
  const steps={ArrowRight:innerWidth*.7,ArrowLeft:-innerWidth*.7};
  if(event.key in steps){event.preventDefault();timelineTrack.scrollBy({left:steps[event.key],behavior:reduced.matches?'auto':'smooth'});}
  else if(event.key==='Home'||event.key==='End'){event.preventDefault();timelineTrack.scrollTo({left:event.key==='Home'?0:timelineTrack.scrollWidth,behavior:reduced.matches?'auto':'smooth'});}
});
window.addEventListener('popstate',()=>syncRoute(true));window.addEventListener('hashchange',()=>syncRoute(true));
homeButton.addEventListener('click',()=>navigate('home'));

// Small, locally drawn SVG doodles; they remain editable without image services.
const doodles = {
  wrench:'<path d="M64 12c-18-5-32 7-30 23L12 66c-6 8-4 17 3 21s15 1 19-5l23-32c16-1 28-16 23-32L67 35l-13-4-4-13 14-6Z"/><circle cx="23" cy="76" r="4"/>',
  flamingo:'<path d="M55 21c16-15 35-4 26 6-3 3-9 1-14 3-9 5-1 17-1 30M81 25l10 7-13 1M65 56c-8-16-36-18-43-1 4 21 28 25 43 8M23 54l-10 8 14 2M37 71l-1 23h-12M48 72l12 10-16 12M30 54q12-11 23 4"/><circle cx="73" cy="21" r="1"/>',
  music:'<path d="M37 69V27l45-12v43M37 39l45-12M37 69c-2-12-24-11-25 2-2 15 26 13 25-2ZM82 58c-3-12-25-9-24 4 2 14 27 10 24-4Z"/>',
  leaf: '<path d="M23 78C-1 47 23 16 67 11c4 38-3 66-36 69M21 89l33-57M33 67l-9-20M40 56l18-4M48 42l-5-11"/>',
  butterfly: '<path d="M49 43c-38-58-65-15-27 12-40 15-10 48 26 8M52 44c37-58 65-12 25 13 38 14 7 47-26 7M49 39l2 40M49 39l-9-16M52 38l10-15"/>',
  paw: '<path d="M31 56c-8 6-19 19-9 30 9 9 20-3 30-1s20 10 27-1c8-13-8-27-16-34-12-9-22-2-32 6Z"/><ellipse cx="17" cy="39" rx="9" ry="13" transform="rotate(-24 17 39)"/><ellipse cx="39" cy="24" rx="9" ry="13" transform="rotate(-8 39 24)"/><ellipse cx="62" cy="24" rx="9" ry="13" transform="rotate(12 62 24)"/><ellipse cx="82" cy="42" rx="9" ry="13" transform="rotate(27 82 42)"/>',
  pine: '<path d="M8 88h83M34 86V72M25 72h21L36 58h11L34 41h9L31 22 19 43h9L15 59h13L14 73h11M67 86V66M52 67h29L65 49h14L64 27h11L61 7 46 29h11L43 50h15L42 68h11"/>',
  spark: '<path d="M49 12c-1 25-8 33-33 36 24 1 32 10 34 35 1-25 9-32 33-36-25-1-32-10-34-35ZM80 8v16M72 16h16M19 74v15M12 82h15"/>',
  yarn: '<circle cx="47" cy="49" r="29"/><path d="M22 34c26 7 38 21 43 40M29 25c24 9 37 21 46 39M20 46c17 6 32 18 37 30M56 22c-23 13-31 27-28 43M70 32c-17 9-25 24-24 45M68 69c26 15 27 30 8 27M33 13l37 77M66 12l-3 12"/>',
  pencil: '<path d="M23 75l-7 15 17-6 48-56-11-10-47 57ZM23 75l10 9M64 26l11 10M17 88l5-1M71 17l6-7 11 11-6 7M16 98q33-7 69-2"/>'
};
function paintDoodle(holder){
  holder.replaceChildren();const art=document.createElementNS(ns,'svg');art.setAttribute('viewBox','0 0 100 100');art.setAttribute('fill','none');art.setAttribute('aria-hidden','true');art.innerHTML=doodles[holder.dataset.doodle]||'';holder.appendChild(art);
}
document.querySelectorAll('[data-doodle]').forEach(paintDoodle);
syncRoute();

// A restrained firefly layer: only transforms and opacity animate. All glows
// are small, static radial gradients; no canvas render loop or filters needed.
const fireflyLayer=document.querySelector('.fireflies');
let fireflySeed=39267;
function fireflyRandom(){fireflySeed=(fireflySeed*1664525+1013904223)>>>0;return fireflySeed/4294967296;}
for(let i=0;i<18;i++){
  const fly=document.createElement('span');fly.className='firefly';
  fly.style.left=(4+fireflyRandom()*92)+'%';
  fly.style.top=(7+fireflyRandom()*86)+'%';
  fly.style.setProperty('--fly-size',(14+fireflyRandom()*11)+'px');
  fly.style.setProperty('--fly-x',((fireflyRandom()-.5)*95)+'px');
  fly.style.setProperty('--fly-y',((fireflyRandom()-.5)*72)+'px');
  fly.style.setProperty('--fly-flight',(23+fireflyRandom()*18)+'s');
  fly.style.setProperty('--fly-delay',(-fireflyRandom()*40)+'s');
  fly.style.setProperty('--fly-pulse',(8+fireflyRandom()*8)+'s');
  const glow=document.createElement('span');glow.className='firefly-glow';
  fly.appendChild(glow);fireflyLayer.appendChild(fly);
}
function syncVisibility(){document.body.classList.toggle('page-hidden',document.hidden);syncAutomaticVideos();}
document.addEventListener('visibilitychange',syncVisibility);
syncVisibility();

// Native dialog viewer preserves focus, Escape and keyboard navigation.
const workViewer=document.querySelector('#work-viewer');
let activeWork=0;
function showWork(index){
  activeWork=(index+creativeWorks.length)%creativeWorks.length;
  const work=creativeWorks[activeWork],src='assets/creative/'+work.file+'.webp';
  const image=document.querySelector('#work-image');image.src=src;image.alt=work.alt;
  document.querySelector('#work-title').textContent=work.title;
  document.querySelector('#work-kind').textContent=work.kind;
  document.querySelector('#work-original').href=src;
  document.querySelector('.work-counter').textContent=String(activeWork+1).padStart(2,'0')+' / '+String(creativeWorks.length).padStart(2,'0');
}
document.querySelectorAll('[data-work]').forEach(button=>button.addEventListener('click',()=>{showWork(Number(button.dataset.work));resetPointer();workViewer.showModal();}));
document.querySelector('.work-close').addEventListener('click',()=>workViewer.close());
document.querySelector('.work-previous').addEventListener('click',()=>showWork(activeWork-1));
document.querySelector('.work-next').addEventListener('click',()=>showWork(activeWork+1));
workViewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showWork(activeWork-1);}if(event.key==='ArrowRight'){event.preventDefault();showWork(activeWork+1);}});
workViewer.addEventListener('click',event=>{if(event.target!==workViewer)return;const r=workViewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)workViewer.close();});
