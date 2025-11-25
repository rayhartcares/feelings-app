const IMAGES = {
  neutral: {
    trigger: './assets/trigger.png',
    reflection: './assets/reflection.png'
  }
};

let character = 'neutral';
let emotion = 'angry';

const app = document.getElementById('app');

function clear() { app.innerHTML = ''; }
function screen(el) { el.className = 'screen'; app.appendChild(el); }
function hero(title, meta='') {
  const h = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  h.appendChild(h2);
  if(meta){
    const p = document.createElement('p'); 
    p.textContent = meta;
    p.className='subtitle';
    h.appendChild(p);
  }
  return h;
}
function media(src){
  const m=document.createElement('div');
  m.className='media';
  const i=document.createElement('img');
  i.src=src;
  m.appendChild(i);
  return m;
}
function para(t){ const p=document.createElement('p'); p.textContent=t; return p; }
function button(t,cls='btn',fn){ const b=document.createElement('button'); b.textContent=t; b.className=cls; b.onclick=fn; return b; }

function showIntro(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero("Feeling Angry","Everyone feels angry sometimes."));
  el.appendChild(media(IMAGES.neutral.trigger));
  const c=document.createElement('div');
  c.appendChild(para("Something happened and now you feel the heat inside your chest."));
  c.appendChild(button("See choices →","btn",()=>showReactionMenu()));
  c.appendChild(button("Restart","btn outline",()=>showIntro()));
  el.appendChild(c);
  screen(el);
}

function showReactionMenu(tab='neg'){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero("What do you do?"));
  const c=document.createElement('div');

  // tabs
  const tabs=document.createElement('div');
  tabs.className='tabs';
  const neg=document.createElement('div'); neg.textContent='Negative'; neg.className='tab'+(tab==='neg'?' active':'');
  const pos=document.createElement('div'); pos.textContent='Coping Tools'; pos.className='tab'+(tab==='pos'?' active':'');
  neg.onclick=()=>showReactionMenu('neg');
  pos.onclick=()=>showReactionMenu('pos');
  tabs.appendChild(neg); tabs.appendChild(pos);
  c.appendChild(tabs);

  const list=document.createElement('div');

  if(tab==='neg'){
    const negList=[
      ['💥 Throw','You throw your toy and it breaks.'],
      ['😡 Yell','You yell loudly and the problem gets bigger.'],
      ['😭 Meltdown','You cry on the floor but still feel upset.'],
      ['😤 Walk away angrily','You stomp but nothing gets fixed.']
    ];
    negList.forEach(([emoji,text])=>{
      const ch=document.createElement('div');
      ch.className='choice';
      ch.textContent= emoji+" "+text.split(' ')[0];
      ch.onclick=()=>showNegativeOutcome(emoji,text);
      list.appendChild(ch);
    });
  } else {
    const posList=[
      ['🎈 Balloon Breathing','Breathe slowly and calm your body.'],
      ['🧸 Stress Squeeze','Squeeze and release to relax.'],
      ['🚶 Walk Away Safely','Find space to calm your mind.'],
      ['👩‍🏫 Talk to Adult','Share what happened.']
    ];
    posList.forEach(([emoji,text])=>{
      const ch=document.createElement('div');
      ch.className='choice';
      ch.textContent=emoji+" "+text.split(' ')[0];
      ch.onclick=()=>showPositive(emoji,text);
      list.appendChild(ch);
    });
  }

  c.appendChild(list);
  el.appendChild(c);
  screen(el);
}

function showNegativeOutcome(emoji,text){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero("Negative reaction"));
  const c=document.createElement('div');
  c.appendChild(para(text));
  c.appendChild(button("Try another","btn outline",()=>showReactionMenu('neg')));
  c.appendChild(button("Coping tools →","btn",()=>showReactionMenu('pos')));
  el.appendChild(c);
  screen(el);
}

function showPositive(emoji,text){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero("Coping Tool"));
  const c=document.createElement('div');
  c.appendChild(para(text));
  c.appendChild(button("Reflection →","btn",()=>showReflection()));
  el.appendChild(c);
  screen(el);
}

function showReflection(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero("Great job!"));
  el.appendChild(media(IMAGES.neutral.reflection));
  const c=document.createElement('div');
  c.appendChild(para("You used a healthy coping tool. You are stronger now."));
  c.appendChild(button("Restart","btn outline",()=>showIntro()));
  el.appendChild(c);
  screen(el);
}

showIntro();

