
const IMAGES = {
  boy: {'01_trigger': './assets/01_trigger.png', 'A1_throw': './assets/boy/A1_throw.png', 'A2_yell': './assets/boy/A2_yell.png', 'A3_panic': './assets/boy/A3_panic.png', 'A4_walk_angry': './assets/boy/A4_walk_angry.png', 'B1_breathe_1': './assets/angry/boy/B1_breathe_1.png', 'B1_breathe_2': './assets/angry/boy/B1_breathe_2.png', 'B1_breathe_3': './assets/angry/boy/B1_breathe_3.png', 'B2_stress_1': './assets/angry/boy/B2_stress_1.png', 'B2_stress_2': './assets/angry/boy/B2_stress_2.png', 'B2_stress_3': './assets/angry/boy/B2_stress_3.png', 'B3_walksafe_1': './assets/angry/boy/B3_walksafe_1.png', 'B3_walksafe_2': './assets/angry/boy/B3_walksafe_2.png', 'B3_walksafe_3': './assets/angry/boy/B3_walksafe_3.png', 'B4_talkadult_1': './assets/angry/boy/B4_talkadult_1.png', 'B4_talkadult_2': './assets/angry/boy/B4_talkadult_2.png', 'B4_talkadult_3': './assets/angry/boy/B4_talkadult_3.png', '99_reflection': './assets/angry/boy/99_reflection.png'},
  girl: {'01_trigger': './assets/girl/01_trigger.png', 'A1_throw': './assets/girl/A1_throw.png', 'A2_yell': './assets/girl/A2_yell.png', 'A3_panic': './assets/girl/A3_panic.png', 'A4_walk_angry': './assets/girl/A4_walk_angry.png', 'B1_breathe_1': './assets/angry/girl/B1_breathe_1.png', 'B1_breathe_2': './assets/angry/girl/B1_breathe_2.png', 'B1_breathe_3': './assets/angry/girl/B1_breathe_3.png', 'B2_stress_1': './assets/angry/girl/B2_stress_1.png', 'B2_stress_2': './assets/angry/girl/B2_stress_2.png', 'B2_stress_3': './assets/angry/girl/B2_stress_3.png', 'B3_walksafe_1': './assets/angry/girl/B3_walksafe_1.png', 'B3_walksafe_2': './assets/angry/girl/B3_walksafe_2.png', 'B3_walksafe_3': './assets/angry/girl/B3_walksafe_3.png', 'B4_talkadult_1': './assets/angry/girl/B4_talkadult_1.png', 'B4_talkadult_2': './assets/angry/girl/B4_talkadult_2.png', 'B4_talkadult_3': './assets/angry/girl/B4_talkadult_3.png', '99_reflection': './assets/angry/girl/99_reflection.png'}
};
let character = null;
let emotion = null;

const app = document.getElementById('app');
function clear(){app.innerHTML='';}
function screen(el){el.className='screen';app.appendChild(el);}
function button(t,c='btn',fn){const b=document.createElement('button');b.textContent=t;b.className=c;if(fn)b.onclick=fn;return b;}
function hero(t,m){const h=document.createElement('div');h.className='hero';const h2=document.createElement('h2');h2.textContent=t;h.appendChild(h2);if(m){const p=document.createElement('p');p.className='meta';p.textContent=m;h.appendChild(p);}return h;}
function media(src){const m=document.createElement('div');m.className='media';const i=document.createElement('img');i.src=src;m.appendChild(i);return m;}
function para(t,cls=''){const p=document.createElement('p');p.textContent=t;if(cls)p.className=cls;return p;}

function showCharacterSelect(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('Choose your character','This sets the images used throughout the journey.'));
  const c=document.createElement('div'); c.className='content columns';
  ['boy','girl'].forEach(k=>{
    const col=document.createElement('div'); col.className='col ' + (k==='boy'?'A':'B');
    const h3=document.createElement('h3'); h3.textContent=k[0].toUpperCase()+k.slice(1); col.appendChild(h3);
    col.appendChild(media(IMAGES[k]['01_trigger']));
    const pick=button('Use this character →','btn',()=>{character=k; showEmotionMenu();});
    pick.style.marginTop='12px'; col.appendChild(pick);
    c.appendChild(col);
  });
  el.appendChild(c); screen(el);
}

function showEmotionMenu(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('What are you feeling today?','Pick an emotion to explore.'));
  const c=document.createElement('div'); c.className='content columns';
  const angry=document.createElement('div'); angry.className='col A';
  angry.innerHTML='<h3>Angry</h3><p class="small">Feeling mad or upset.</p>';
  angry.appendChild(media(IMAGES[character]['01_trigger']));
  angry.appendChild(button('Explore Angry →','btn',()=>{emotion='angry'; showAngryIntro();}));
  c.appendChild(angry);
  const soon=document.createElement('div'); soon.className='col B';
  soon.innerHTML='<h3>More emotions</h3><p class="small">Coming next: Happy, Sad, Scared…</p>';
  c.appendChild(soon);
  el.appendChild(c); screen(el);
}

function showAngryIntro(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('Feeling Angry','Introduction'));
  el.appendChild(media(IMAGES[character]['01_trigger']));
  const c=document.createElement('div'); c.className='content';
  c.appendChild(para('You feel mad or upset. It’s okay to feel angry — everyone does sometimes.'));
  const r=document.createElement('div'); r.className='cta-row';
  r.appendChild(button('Continue → Situation Scene','btn',()=>showAngryTrigger()));
  r.appendChild(button('Change emotion','btn outline',()=>showEmotionMenu()));
  c.appendChild(r); el.appendChild(c); screen(el);
}

function showAngryTrigger(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('Situation Scene','What happened?'));
  el.appendChild(media(IMAGES[character]['01_trigger']));
  const c=document.createElement('div'); c.className='content';
  c.appendChild(para('Someone grabbed the toy you were using. Your chest tightens and your face feels hot.'));
  const r=document.createElement('div'); r.className='cta-row';
  r.appendChild(button('See choices →','btn',()=>showReactionMenu()));
  c.appendChild(r); el.appendChild(c); screen(el);
}

function showReactionMenu(tab='neg'){ // 'neg' or 'pos'
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('What do you do when you’re angry?','Choose how you might react.'));
  const c=document.createElement('div'); c.className='content';
  const tabs=document.createElement('div'); tabs.className='tabs';
  const negTab=document.createElement('div'); negTab.className='tab' + (tab==='neg'?' active':''); negTab.textContent='Negative reactions'; negTab.onclick=()=>showReactionMenu('neg');
  const posTab=document.createElement('div'); posTab.className='tab' + (tab==='pos'?' active':''); posTab.textContent='Coping tools'; posTab.onclick=()=>showReactionMenu('pos');
  tabs.appendChild(negTab); tabs.appendChild(posTab); c.appendChild(tabs);

  const cols=document.createElement('div'); cols.className='columns';
  const col=document.createElement('div'); col.className='col ' + (tab==='neg'?'A':'B');

  const options = tab==='neg' ? [
    ['Throw the toy', 'A1_throw'],
    ['Yell loudly', 'A2_yell'],
    ['Lie on the floor (meltdown)', 'A3_panic'],
    ['Walk away angrily', 'A4_walk_angry']
  ] : [
    ['Take balloon breaths', 'B1_breathe'],
    ['Squeeze a stress ball', 'B2_stress'],
    ['Walk away safely', 'B3_walksafe'],
    ['Talk to a grown-up', 'B4_talkadult']
  ];

  options.forEach(([label,key])=>{
    const ch=document.createElement('div'); ch.className='choice'; ch.textContent=label;
    ch.onclick=()=> (tab==='neg' ? showNegativeOutcome(key,label) : showPositiveSequence(key,label,1));
    col.appendChild(ch);
  });

  cols.appendChild(col); c.appendChild(cols);
  const r=document.createElement('div'); r.className='cta-row';
  r.appendChild(button('Back','btn outline',()=>showAngryTrigger()));
  c.appendChild(r);
  el.appendChild(c); screen(el);
}

function showNegativeOutcome(key,label){
  const img = IMAGES[character][key];
  const textMap = {
    'A1_throw': "You threw the toy. It hits the wall and breaks. The noise startles everyone. You still feel hot inside.",
    'A2_yell': "You yell as loud as you can. The other child yells back. Your chest feels tighter and hotter.",
    'A3_panic': "You lie on the floor, kicking and crying. People watch, worried. You feel tired and still upset.",
    'A4_walk_angry': "You stomp away and slam the door. The problem is still there, and you still feel hot inside."
  };
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('Result of that choice','Negative reaction'));
  el.appendChild(media(img));
  const c=document.createElement('div'); c.className='content';
  c.appendChild(para(textMap[key] || label));
  const r=document.createElement('div'); r.className='cta-row';
  r.appendChild(button('Try another negative','btn outline',()=>showReactionMenu('neg')));
  r.appendChild(button('See coping tools →','btn',()=>showReactionMenu('pos')));
  c.appendChild(r); el.appendChild(c); screen(el);
}

function showPositiveSequence(key,label,step){
  const stepMap = {
    'B1_breathe': [
      ['B1_breathe_1', 'You take a deep breath, like blowing up a balloon. In and out.'],
      ['B1_breathe_2', 'Your heartbeat slows down. Your shoulders drop.'],
      ['B1_breathe_3', 'The hot feeling fades. You can think again.']
    ],
    'B2_stress': [
      ['B2_stress_1', 'You grab a squishy ball and press it hard. Energy moves to your hands.'],
      ['B2_stress_2', 'You keep squeezing and breathing slowly. Your hands start to relax.'],
      ['B2_stress_3', 'You feel calmer now. The anger turns into quiet strength.']
    ],
    'B3_walksafe': [
      ['B3_walksafe_1', 'You take a few steps back to give yourself space.'],
      ['B3_walksafe_2', 'As you walk, you notice your breathing slowing.'],
      ['B3_walksafe_3', 'You return ready to talk without shouting.']
    ],
    'B4_talkadult': [
      ['B4_talkadult_1', 'You go to a grown-up and tell them what happened.'],
      ['B4_talkadult_2', 'They listen carefully and help you find words for what you feel.'],
      ['B4_talkadult_3', 'You feel safe and understood. Peace replaces the anger.']
    ]
  };
  const seq = stepMap[key];
  const [imgKey, text] = seq[step-1];
  const img = IMAGES[character][imgKey];
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('Coping tool in action','Positive sequence'));
  el.appendChild(media(img));
  const c=document.createElement('div'); c.className='content';
  c.appendChild(para(text));
  const r=document.createElement('div'); r.className='cta-row';
  if(step < 3){
    r.appendChild(button('Next step →','btn',()=>showPositiveSequence(key,label,step+1)));
    r.appendChild(button('Restart this tool','btn outline',()=>showPositiveSequence(key,label,1)));
  } else {
    r.appendChild(button('Reflection →','btn',()=>showReflection()));
    r.appendChild(button('Try another coping tool','btn outline',()=>showReactionMenu('pos')));
  }
  c.appendChild(r); el.appendChild(c); screen(el);
}

function showReflection(){
  clear();
  const el=document.createElement('section');
  el.appendChild(hero('Reflection','Closure'));
  el.appendChild(media(IMAGES[character]['99_reflection']));
  const c=document.createElement('div'); c.className='content';
  c.appendChild(para('You did it. You found ways to calm your body and make good choices. That’s how you grow stronger inside.'));
  const r=document.createElement('div'); r.className='cta-row';
  r.appendChild(button('Restart','btn outline',()=>showAngryIntro()));
  r.appendChild(button('Change emotion','btn outline',()=>showEmotionMenu()));
  r.appendChild(button('Change character','btn outline',()=>showCharacterSelect()));
  c.appendChild(r); el.appendChild(c); screen(el);
}

showCharacterSelect();
