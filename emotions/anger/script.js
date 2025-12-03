// Brave Feelings Lab – Single-page emoji navigator
// State machine for menu + ANGER flow

const app = document.getElementById("app");
const music = document.getElementById("bg-music");

const state = {
  view: "menu", // menu | anger_welcome | anger_character | anger_trigger | anger_menu | anger_negative | anger_tool | goodbye
  emotion: null, // 'anger'
  character: "boy", // boy | girl
  activeTab: "negative", // negative | coping
  currentReaction: null, // key from negativeReactions
  currentTool: null, // key from copingTools
  toolStep: 1,
};

// --- Content data ---------------------------------------------------------

const negativeReactions = {
  throw: {
    label: "Throwing Things",
    emoji: "💥",
    sceneEmoji: "🧸💥",
    description:
      "You throw the toy as hard as you can. It might break and someone could get hurt. The anger is still burning inside.",
  },
  yell: {
    label: "Yelling Loudly",
    emoji: "🗣️",
    sceneEmoji: "🗣️😫",
    description:
      "You yell so loudly that other people cover their ears. Everyone feels tense and upset. The problem is still not solved.",
  },
  meltdown: {
    label: "Having a Meltdown",
    emoji: "😭",
    sceneEmoji: "😭🌧️",
    description:
      "You fall to the floor, crying and kicking. Your body gets very tired and you still feel upset on the inside.",
  },
  stomp: {
    label: "Stomping Away",
    emoji: "😤",
    sceneEmoji: "😤🚪",
    description:
      "You stomp away and slam the door. The angry fire is still inside, and the problem is waiting for you when you come back.",
  },
};

const copingTools = {
  balloon: {
    name: "Balloon Breathing",
    emoji: "🎈",
    steps: [
      "Imagine a big balloon in your tummy. Breathe in slowly through your nose and fill it up.",
      "Hold your breath for 3 seconds. 1… 2… 3… Feel your body pause.",
      "Blow the air out slowly through your mouth, like letting the balloon float away. Notice how calm feels in your body.",
    ],
  },
  squeeze: {
    name: "Stress Squeeze",
    emoji: "🧸",
    steps: [
      "Grab a soft toy, pillow, or just your own hands. Squeeze them tight.",
      "Squeeze all your muscles like a strong statue. Count slowly to 5 in your head.",
      "Let your body go soft, like a cooked noodle. Notice the calm feeling in your chest.",
    ],
  },
  walk: {
    name: "Safe Walk",
    emoji: "🚶‍♂️",
    steps: [
      "Stop what you are doing. Look for a safe place where you can walk.",
      "Walk slowly to your safe spot or a window. Feel your feet touching the floor.",
      "Look around and find 3 things that are blue or green. Breathe while you look at each one.",
    ],
  },
  count: {
    name: "Count to 10",
    emoji: "🔢",
    steps: [
      "Close your eyes for a moment. Take one slow breath in and out.",
      "Start counting in your head from 1 up to 10, nice and slow.",
      "When you reach 10, open your eyes and notice how your body feels calmer.",
    ],
  },
};

// --- Rendering helpers ----------------------------------------------------

function h(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function clear() {
  app.innerHTML = "";
}

function render() {
  clear();
  switch (state.view) {
    case "menu":
      renderMenu();
      break;
    case "anger_welcome":
      renderAngerWelcome();
      break;
    case "anger_character":
      renderCharacter();
      break;
    case "anger_trigger":
      renderTrigger();
      break;
    case "anger_menu":
      renderAngerMenu();
      break;
    case "anger_negative":
      renderNegative();
      break;
    case "anger_tool":
      renderTool();
      break;
    case "goodbye":
      renderGoodbye();
      break;
  }
  // Back button: disabled on menu & goodbye
  document
    .querySelectorAll('[data-action="back"]')
    .forEach((btn) => (btn.disabled = state.view === "menu" || state.view === "goodbye"));
}

// --- Individual views -----------------------------------------------------

function renderMenu() {
  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="card-title">Brave Feelings Lab</div>
    <div class="card-subtitle">Which emotion are you exploring today?</div>
  `;

  const list = h("div", "menu-list");

  // ANGER – active
  const anger = h("button", "menu-item anger");
  anger.innerHTML = `
    <div class="menu-emoji">😡</div>
    <div class="menu-label">
      <div class="menu-label-title">ANGER</div>
      <div class="menu-label-sub">Start navigator</div>
    </div>
    <div class="menu-action">Start ▶</div>
  `;
  anger.onclick = () => {
    state.emotion = "anger";
    state.view = "anger_welcome";
    render();
  };

  const frustrated = h("div", "menu-item frustrated disabled");
  frustrated.innerHTML = `
    <div class="menu-emoji">😖</div>
    <div class="menu-label">
      <div class="menu-label-title">FRUSTRATED</div>
      <div class="menu-label-sub">Coming soon</div>
    </div>
    <div class="menu-action">Soon</div>
  `;

  const sadness = h("div", "menu-item disabled");
  sadness.innerHTML = `
    <div class="menu-emoji">😢</div>
    <div class="menu-label">
      <div class="menu-label-title">SADNESS</div>
      <div class="menu-label-sub">Coming soon</div>
    </div>
    <div class="menu-action">Soon</div>
  `;

  list.append(anger, frustrated, sadness);
  card.appendChild(list);
  app.appendChild(card);
}

function renderAngerWelcome() {
  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="screen-title" style="color:#ef4444;">Brave Feelings Lab</div>
    <div class="screen-subtitle">Emotion Navigator – ANGRY</div>
  `;
  const emoji = h("div", "emotion-emoji", "😡");
  card.appendChild(emoji);

  const start = h("button", "btn-primary", "Start");
  start.onclick = () => {
    state.view = "anger_character";
    render();
  };

  card.appendChild(start);
  app.appendChild(card);
}

function renderCharacter() {
  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="screen-title">Who is playing today?</div>
    <div class="screen-subtitle">Pick the character that looks most like you.</div>
  `;

  const grid = h("div", "character-grid");

  const boy = h("div", "character-card boy");
  boy.innerHTML = `
    <div class="character-emoji">👦</div>
    <div class="character-label">Use Boy</div>
  `;
  boy.onclick = () => {
    state.character = "boy";
    state.view = "anger_trigger";
    render();
  };

  const girl = h("div", "character-card girl");
  girl.innerHTML = `
    <div class="character-emoji">👧</div>
    <div class="character-label">Use Girl</div>
  `;
  girl.onclick = () => {
    state.character = "girl";
    state.view = "anger_trigger";
    render();
  };

  grid.append(boy, girl);
  card.appendChild(grid);
  app.appendChild(card);
}

function renderTrigger() {
  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="screen-title">Uh oh! Something happened!</div>
    <div class="screen-subtitle">Let’s see why you feel angry.</div>
  `;

  const scene = h("div", "scene-card");
  const topEmoji = h("div", "scene-emoji", "🧸➡️💔");
  scene.appendChild(topEmoji);
  card.appendChild(scene);

  const text = h(
    "div",
    "text-bubble",
    "You were playing with your favorite toy, but it suddenly broke! Now you feel a hot fire in your tummy. You are ANGRY."
  );
  card.appendChild(text);

  const row = h("div", "btn-row");
  const back = h("button", "btn-secondary", "Back");
  back.onclick = () => {
    state.view = "anger_character";
    render();
  };
  const next = h("button", "btn-primary", "Next");
  next.onclick = () => {
    state.view = "anger_menu";
    state.activeTab = "negative";
    render();
  };
  row.append(back, next);
  card.appendChild(row);

  app.appendChild(card);
}

function renderAngerMenu() {
  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="screen-title">What will you do?</div>
    <div class="screen-subtitle">Tap a button to see what happens.</div>
  `;

  // Tabs
  const tabs = h("div", "tabs");
  const negBtn = h("button", "tab", "Negative Reactions");
  const copeBtn = h("button", "tab", "Coping Tools");

  if (state.activeTab === "negative") negBtn.classList.add("active");
  else copeBtn.classList.add("active");

  negBtn.onclick = () => {
    state.activeTab = "negative";
    render();
  };
  copeBtn.onclick = () => {
    state.activeTab = "coping";
    render();
  };

  tabs.append(negBtn, copeBtn);
  card.appendChild(tabs);

  const grid = h("div", "tile-grid");

  if (state.activeTab === "negative") {
    Object.entries(negativeReactions).forEach(([key, data]) => {
      const tile = h("button", "tile");
      tile.innerHTML = `
        <div class="tile-emoji">${data.emoji}</div>
        <div class="tile-label">${data.label}</div>
      `;
      tile.onclick = () => {
        state.currentReaction = key;
        state.view = "anger_negative";
        render();
      };
      grid.appendChild(tile);
    });
  } else {
    Object.entries(copingTools).forEach(([key, tool]) => {
      const tile = h("button", "tile coping");
      tile.innerHTML = `
        <div class="tile-emoji">${tool.emoji}</div>
        <div class="tile-label">${tool.name}</div>
      `;
      tile.onclick = () => {
        state.currentTool = key;
        state.toolStep = 1;
        state.view = "anger_tool";
        render();
      };
      grid.appendChild(tile);
    });
  }

  card.appendChild(grid);
  app.appendChild(card);
}

function renderNegative() {
  const data = negativeReactions[state.currentReaction];
  if (!data) return;

  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="screen-title">${data.label}</div>
    <div class="screen-subtitle">This is a negative reaction.</div>
  `;

  const emoji = h("div", "outcome-emoji", data.sceneEmoji);
  card.appendChild(emoji);

  const text = h("div", "text-bubble");
  text.textContent = data.description;
  card.appendChild(text);

  const row = h("div", "btn-row");
  const back = h("button", "btn-secondary", "Try another reaction");
  back.onclick = () => {
    state.view = "anger_menu";
    state.activeTab = "negative";
    render();
  };
  const goCoping = h("button", "btn-primary", "Go to coping tools ✨");
  goCoping.onclick = () => {
    state.view = "anger_menu";
    state.activeTab = "coping";
    render();
  };
  row.append(back, goCoping);
  card.appendChild(row);

  app.appendChild(card);
}

function renderTool() {
  const tool = copingTools[state.currentTool];
  if (!tool) return;

  const stepIndex = state.toolStep - 1;
  const stepText = tool.steps[stepIndex];

  const card = h("div", "card fade");
  card.innerHTML = `
    <div class="screen-title">${tool.name}</div>
    <div class="screen-subtitle">A calming tool you can practice.</div>
  `;

  const emoji = h("div", "outcome-emoji", tool.emoji);
  card.appendChild(emoji);

  const stepChip = h(
    "div",
    "step-chip",
    `Step ${state.toolStep} of ${tool.steps.length}`
  );
  card.appendChild(stepChip);

  const text = h("div", "text-bubble");
  text.textContent = stepText;
  card.appendChild(text);

  const row = h("div", "btn-row");

  const restart = h("button", "btn-secondary", "Restart");
  restart.onclick = () => {
    state.toolStep = 1;
    render();
  };

  const nextLabel =
    state.toolStep === tool.steps.length ? "Finish ✨" : "Next step ➜";
  const next = h("button", "btn-primary", nextLabel);
  next.onclick = () => {
    if (state.toolStep < tool.steps.length) {
      state.toolStep += 1;
      render();
    } else {
      state.view = "goodbye";
      render();
    }
  };

  row.append(restart, next);
  card.appendChild(row);

  app.appendChild(card);
}

function renderGoodbye() {
  const card = h("div", "card fade", "");
  card.innerHTML = `
    <div class="screen-title goodbye">👋 See You Next Time!</div>
    <div class="screen-subtitle" style="color:#e5e7eb;">
      Thank you for visiting the Brave Feelings Lab. You can close this tab or tap Start Over.
    </div>
  `;
  const btn = h("button", "btn-primary", "Start Over");
  btn.onclick = () => {
    state.view = "menu";
    render();
  };
  card.style.background = "#020617";
  card.style.color = "#e5e7eb";

  app.appendChild(card);
}

// --- Top bar controls -----------------------------------------------------

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music
      .play()
      .catch(() => {
        /* ignore autoplay errors */
      });
  } else {
    music.pause();
  }
}

// Back / Home / Exit buttons
function handleTopAction(action) {
  switch (action) {
    case "back":
      if (state.view === "anger_welcome") state.view = "menu";
      else if (state.view === "anger_character") state.view = "anger_welcome";
      else if (state.view === "anger_trigger") state.view = "anger_character";
      else if (state.view === "anger_menu") state.view = "anger_trigger";
      else if (state.view === "anger_negative" || state.view === "anger_tool") {
        state.view = "anger_menu";
      } else if (state.view === "goodbye") {
        state.view = "menu";
      }
      render();
      break;
    case "home":
      state.view = "menu";
      render();
      break;
    case "exit":
      state.view = "goodbye";
      render();
      break;
    case "music":
      toggleMusic();
      break;
  }
}

// Attach listeners once
document
  .querySelectorAll("[data-action]")
  .forEach((btn) =>
    btn.addEventListener("click", (e) =>
      handleTopAction(e.currentTarget.dataset.action)
    )
  );

// INIT
render();
