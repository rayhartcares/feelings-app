// =========================
// Brave Feelings Lab – ANGRY
// Optimized + Safe + Ready for Re-use
// =========================

// All image paths stay the same as your current folders
const IMAGES = {
  boy: {
    '01_trigger': './assets/boy/01_trigger.png',
    '02_trigger': './assets/boy/02_trigger.png',
    'A1_throw': './assets/boy/A1_throw.png',
    'A2_yell': './assets/boy/A2_yell.png',
    'A3_panic': './assets/boy/A3_panic.png',
    'A4_walk_angry': './assets/boy/A4_walk_angry.png',

    'B1_breathe_1': './assets/boy/B1_breathe_1.png',
    'B1_breathe_2': './assets/boy/B1_breathe_2.png',
    'B1_breathe_3': './assets/boy/B1_breathe_3.png',

    'B2_stress_1': './assets/boy/B2_stress_1.png',
    'B2_stress_2': './assets/boy/B2_stress_2.png',
    'B2_stress_3': './assets/boy/B2_stress_3.png',

    'B3_walksafe_1': './assets/boy/B3_walksafe_1.png',
    'B3_walksafe_2': './assets/boy/B3_walksafe_2.png',
    'B3_walksafe_3': './assets/boy/B3_walksafe_3.png',

    'B4_talkadult_1': './assets/boy/B4_talkadult_1.png',
    'B4_talkadult_2': './assets/boy/B4_talkadult_2.png',
    'B4_talkadult_3': './assets/boy/B4_talkadult_3.png',

    '99_reflection': './assets/boy/99_reflection.png'
  },

  girl: {
    '01_trigger': './assets/girl/01_trigger.png',
    '02_trigger': './assets/girl/02_trigger.png',
    'A1_throw': './assets/girl/A1_throw.png',
    'A2_yell': './assets/girl/A2_yell.png',
    'A3_panic': './assets/girl/A3_panic.png',
    'A4_walk_angry': './assets/girl/A4_walk_angry.png',

    'B1_breathe_1': './assets/girl/B1_breathe_1.png',
    'B1_breathe_2': './assets/girl/B1_breathe_2.png',
    'B1_breathe_3': './assets/girl/B1_breathe_3.png',

    'B2_stress_1': './assets/girl/B2_stress_1.png',
    'B2_stress_2': './assets/girl/B2_stress_2.png',
    'B2_stress_3': './assets/girl/B2_stress_3.png',

    'B3_walksafe_1': './assets/girl/B3_walksafe_1.png',
    'B3_walksafe_2': './assets/girl/B3_walksafe_2.png',
    'B3_walksafe_3': './assets/girl/B3_walksafe_3.png',

    'B4_talkadult_1': './assets/girl/B4_talkadult_1.png',
    'B4_talkadult_2': './assets/girl/B4_talkadult_2.png',
    'B4_talkadult_3': './assets/girl/B4_talkadult_3.png',

    '99_reflection': './assets/girl/99_reflection.png'
  }
};

// Simple state container
const STATE = {
  character: null,  // "boy" | "girl"
  emotion: null     // currently only "angry"
};

// Root app container
const app = document.getElementById('app');

// ------------- Generic helpers -------------

function clearApp() {
  app.innerHTML = '';
}

function makeScreen() {
  const el = document.createElement('section');
  el.className = 'screen';
  return el;
}

function mountScreen(section) {
  clearApp();
  app.appendChild(section);
}

function makeButton(label, className = 'btn', handler) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.className = className;
  if (handler) btn.addEventListener('click', handler);
  return btn;
}

function makeHero(title, meta) {
  const h = document.createElement('div');
  h.className = 'hero';

  const h2 = document.createElement('h2');
  h2.textContent = title;
  h.appendChild(h2);

  if (meta) {
    const p = document.createElement('p');
    p.className = 'meta';
    p.textContent = meta;
    h.appendChild(p);
  }

  return h;
}

function makeParagraph(text, className) {
  const p = document.createElement('p');
  p.textContent = text;
  if (className) p.className = className;
  return p;
}

/**
 * Safely create media block from an image src.
 * If src is missing, we still render a friendly placeholder.
 */
function makeMedia(src, altText = 'Scene illustration') {
  const wrapper = document.createElement('div');
  wrapper.className = 'media';

  const img = document.createElement('img');

  if (src) {
    img.src = src;
    img.alt = altText;
  } else {
    // Graceful fallback – no broken "undefined" src
    img.alt = 'Illustration coming soon';
    img.style.opacity = '0.35';
    img.style.border = '2px dashed #cbd5e1';
  }

  wrapper.appendChild(img);
  return wrapper;
}

/**
 * Preload all images for the selected character.
 * This improves the feel when stepping through sequences.
 */
function preloadCharacterImages(character) {
  const map = IMAGES[character];
  if (!map) return Promise.resolve();

  const sources = Object.values(map);

  const loaders = sources.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = src;
    });
  });

  return Promise.all(loaders);
}

// ------------- Screens -------------

function showLoadingScreen(next) {
  const section = makeScreen();
  section.appendChild(makeHero('Loading pictures…', 'Just a moment.'));
  const content = document.createElement('div');
  content.className = 'content';
  content.appendChild(
    makeParagraph('We are getting your Brave Feelings scenes ready.', 'small')
  );
  section.appendChild(content);
  mountScreen(section);

  next();
}

function showCharacterSelect() {
  const section = makeScreen();
  section.appendChild(
    makeHero(
      'Choose your character',
      'This sets the images used throughout the journey.'
    )
  );

  const columns = document.createElement('div');
  columns.className = 'content columns';

  ['boy', 'girl'].forEach(key => {
    const col = document.createElement('div');
    col.className = 'col ' + (key === 'boy' ? 'A' : 'B');

    const h3 = document.createElement('h3');
    h3.textContent = key[0].toUpperCase() + key.slice(1);
    col.appendChild(h3);

    col.appendChild(
      makeMedia(IMAGES[key]['01_trigger'], `${h3.textContent} feeling angry`)
    );

    const pick = makeButton(
      'Use this character →',
      'btn',
      () => {
        STATE.character = key;

        // Show a tiny loading screen while we preload
        showLoadingScreen(() => {
          preloadCharacterImages(key).then(() => {
            showEmotionMenu();
          });
        });
      }
    );
    pick.style.marginTop = '12px';
    col.appendChild(pick);

    columns.appendChild(col);
  });

  section.appendChild(columns);
  mountScreen(section);
}

function showEmotionMenu() {
  const section = makeScreen();
  section.appendChild(
    makeHero(
      'What are you feeling today?',
      'Pick an emotion to explore.'
    )
  );

  const columns = document.createElement('div');
  columns.className = 'content columns';

  const angryCol = document.createElement('div');
  angryCol.className = 'col A';
  angryCol.innerHTML = '<h3>Angry</h3><p class="small">Feeling mad or upset.</p>';

  angryCol.appendChild(
    makeMedia(
      IMAGES[STATE.character]['02_trigger'],
      'Child starting to feel angry'
    )
  );

  angryCol.appendChild(
    makeButton('Explore Angry →', 'btn', () => {
      STATE.emotion = 'angry';
      showAngryIntro();
    })
  );
  columns.appendChild(angryCol);

  const soon = document.createElement('div');
  soon.className = 'col B';
  soon.innerHTML =
    '<h3>More emotions</h3><p class="small">Coming next: Happy, Sad, Scared…</p>';
  columns.appendChild(soon);

  section.appendChild(columns);
  mountScreen(section);
}

function showAngryIntro() {
  const section = makeScreen();
  section.appendChild(makeHero('Feeling Angry', 'Introduction'));

  section.appendChild(
    makeMedia(
      IMAGES[STATE.character]['02_trigger'],
      'Child noticing anger starting'
    )
  );

  const content = document.createElement('div');
  content.className = 'content';
  content.appendChild(
    makeParagraph(
      'You feel mad or upset. It’s okay to feel angry — everyone does sometimes.'
    )
  );

  const row = document.createElement('div');
  row.className = 'cta-row';
  row.appendChild(
    makeButton(
      'Continue → Situation Scene',
      'btn',
      () => showAngryTrigger()
    )
  );
  row.appendChild(
    makeButton(
      'Change emotion',
      'btn outline',
      () => showEmotionMenu()
    )
  );

  content.appendChild(row);
  section.appendChild(content);
  mountScreen(section);
}

function showAngryTrigger() {
  const section = makeScreen();
  section.appendChild(makeHero('Situation Scene', 'What happened?'));

  section.appendChild(
    makeMedia(
      IMAGES[STATE.character]['02_trigger'],
      'Another child grabbing the toy'
    )
  );

  const content = document.createElement('div');
  content.className = 'content';
  content.appendChild(
    makeParagraph(
      'Someone grabbed the toy you were using. Your chest tightens and your face feels hot.'
    )
  );

  const row = document.createElement('div');
  row.className = 'cta-row';
  row.appendChild(
    makeButton('See choices →', 'btn', () => showReactionMenu('neg'))
  );
  content.appendChild(row);

  section.appendChild(content);
  mountScreen(section);
}

function showReactionMenu(tab = 'neg') {
  const section = makeScreen();
  section.appendChild(
    makeHero(
      'What do you do when you’re angry?',
      'Choose how you might react.'
    )
  );

  const content = document.createElement('div');
  content.className = 'content';

  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'tabs';

  const negTab = document.createElement('div');
  negTab.className = 'tab' + (tab === 'neg' ? ' active' : '');
  negTab.textContent = 'Negative reactions';
  negTab.onclick = () => showReactionMenu('neg');

  const posTab = document.createElement('div');
  posTab.className = 'tab' + (tab === 'pos' ? ' active' : '');
  posTab.textContent = 'Coping tools';
  posTab.onclick = () => showReactionMenu('pos');

  tabs.appendChild(negTab);
  tabs.appendChild(posTab);
  content.appendChild(tabs);

  // Column with choices
  const columns = document.createElement('div');
  columns.className = 'columns';
  const col = document.createElement('div');
  col.className = 'col ' + (tab === 'neg' ? 'A' : 'B');

  const options =
    tab === 'neg'
      ? [
          ['💥 Throw the toy', 'A1_throw'],
          ['😡 Yell loudly', 'A2_yell'],
          ['😭 Lie on the floor (meltdown)', 'A3_panic'],
          ['😤 Walk away angrily', 'A4_walk_angry']
        ]
      : [
          ['🎈 Take balloon breaths', 'B1_breathe'],
          ['🧸 Squeeze a stress ball', 'B2_stress'],
          ['🚶‍♂️ Walk away safely', 'B3_walksafe'],
          ['👩‍🏫 Talk to a grown-up', 'B4_talkadult']
        ];

  options.forEach(([label, key]) => {
    const choice = document.createElement('div');
    choice.className = 'choice';
    choice.textContent = label;
    choice.onclick = () =>
      tab === 'neg'
        ? showNegativeOutcome(key, label)
        : showPositiveSequence(key, label, 1);

    col.appendChild(choice);
  });

  columns.appendChild(col);
  content.appendChild(columns);

  const row = document.createElement('div');
  row.className = 'cta-row';
  row.appendChild(
    makeButton('Back', 'btn outline', () => showAngryTrigger())
  );
  content.appendChild(row);

  section.appendChild(content);
  mountScreen(section);
}

function showNegativeOutcome(key, labelFallback) {
  const imgSrc = IMAGES[STATE.character][key];

  const textMap = {
    A1_throw:
      'You threw the toy. It hits the wall and breaks. The noise startles everyone. You still feel hot inside.',
    A2_yell:
      'You yell as loud as you can. The other child yells back. Your chest feels tighter and hotter.',
    A3_panic:
      'You lie on the floor, kicking and crying. People watch, worried. You feel tired and still upset.',
    A4_walk_angry:
      'You stomp away and slam the door. The problem is still there, and you still feel hot inside.'
  };

  const section = makeScreen();
  section.appendChild(makeHero('Result of that choice', 'Negative reaction'));
  section.appendChild(
    makeMedia(imgSrc, 'Negative reaction illustration')
  );

  const content = document.createElement('div');
  content.className = 'content';
  content.appendChild(
    makeParagraph(textMap[key] || labelFallback)
  );

  const row = document.createElement('div');
  row.className = 'cta-row';
  row.appendChild(
    makeButton(
      'Try another negative',
      'btn outline',
      () => showReactionMenu('neg')
    )
  );
  row.appendChild(
    makeButton(
      'See coping tools →',
      'btn',
      () => showReactionMenu('pos')
    )
  );

  content.appendChild(row);
  section.appendChild(content);
  mountScreen(section);
}

function showPositiveSequence(key, label, step) {
  const stepMap = {
    B1_breathe: [
      ['B1_breathe_1', 'You take a deep breath, like blowing up a balloon. In and out.'],
      ['B1_breathe_2', 'Your heartbeat slows down. Your shoulders drop.'],
      ['B1_breathe_3', 'The hot feeling fades. You can think again.']
    ],
    B2_stress: [
      ['B2_stress_1', 'You grab a squishy ball and press it hard. Energy moves to your hands.'],
      ['B2_stress_2', 'You keep squeezing and breathing slowly. Your hands start to relax.'],
      ['B2_stress_3', 'You feel calmer now. The anger turns into quiet strength.']
    ],
    B3_walksafe: [
      ['B3_walksafe_1', 'You take a few steps back to give yourself space.'],
      ['B3_walksafe_2', 'As you walk, you notice your breathing slowing.'],
      ['B3_walksafe_3', 'You return ready to talk without shouting.']
    ],
    B4_talkadult: [
      ['B4_talkadult_1', 'You go to a grown-up and tell them what happened.'],
      ['B4_talkadult_2', 'They listen carefully and help you find words for what you feel.'],
      ['B4_talkadult_3', 'You feel safe and understood. Peace replaces the anger.']
    ]
  };

  const seq = stepMap[key];
  const [imgKey, text] = seq[step - 1];
  const imgSrc = IMAGES[STATE.character][imgKey];

  const section = makeScreen();
  section.appendChild(makeHero('Coping tool in action', 'Positive sequence'));
  section.appendChild(
    makeMedia(imgSrc, 'Coping skill step illustration')
  );

  const content = document.createElement('div');
  content.className = 'content';
  content.appendChild(makeParagraph(text));

  const row = document.createElement('div');
  row.className = 'cta-row';

  if (step < 3) {
    row.appendChild(
      makeButton('Next step →', 'btn', () =>
        showPositiveSequence(key, label, step + 1)
      )
    );
    row.appendChild(
      makeButton('Restart this tool', 'btn outline', () =>
        showPositiveSequence(key, label, 1)
      )
    );
  } else {
    row.appendChild(
      makeButton('Reflection →', 'btn', () => showReflection())
    );
    row.appendChild(
      makeButton('Try another coping tool', 'btn outline', () =>
        showReactionMenu('pos')
      )
    );
  }

  content.appendChild(row);
  section.appendChild(content);
  mountScreen(section);
}

function showReflection() {
  const section = makeScreen();
  section.appendChild(makeHero('Reflection', 'Closure'));

  section.appendChild(
    makeMedia(
      IMAGES[STATE.character]['99_reflection'],
      'Child feeling calmer and proud'
    )
  );

  const content = document.createElement('div');
  content.className = 'content';
  content.appendChild(
    makeParagraph(
      'You did it. You found ways to calm your body and make good choices. That’s how you grow stronger inside.'
    )
  );

  const row = document.createElement('div');
  row.className = 'cta-row';
  row.appendChild(
    makeButton('Restart', 'btn outline', () => showAngryIntro())
  );
  row.appendChild(
    makeButton('Change emotion', 'btn outline', () => showEmotionMenu())
  );
  row.appendChild(
    makeButton('Change character', 'btn outline', () => showCharacterSelect())
  );

  content.appendChild(row);
  section.appendChild(content);
  mountScreen(section);
}

// Start app
showCharacterSelect();

