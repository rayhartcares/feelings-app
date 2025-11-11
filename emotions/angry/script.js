// Standalone logic for FRUSTRATED; same function names/flow as ANGRY, new content
let currentGender = "";
let currentEmotion = "";

const positiveResults = {
  break: {
    emoji: "⏸️🙂✨",
    text:
      "<div class='white-card'><strong>Good reset!</strong><br/>You took a short break and stretched. Your body cooled down, and your thinking brain came back online.</div>" +
      "<div class='white-card'><strong>The science:</strong> Brief movement + breathing reduces stress signals, which lets the prefrontal cortex plan the next step.</div>",
  },
  chunk: {
    emoji: "🧩📝🙂",
    text:
      "<div class='white-card'><strong>Smart plan!</strong><br/>You split the problem into smaller steps and solved one at a time.</div>" +
      "<div class='white-card'><strong>The science:</strong> Chunking reduces cognitive load, so your brain can focus and build momentum.</div>",
  },
  help: {
    emoji: "🧑‍🏫🤝🙂",
    text:
      "<div class='white-card'><strong>Great teamwork!</strong><br/>You asked for a hint—now you know what to try next.</div>" +
      "<div class='white-card'><strong>The science:</strong> Getting targeted feedback closes knowledge gaps faster than trial-and-error alone.</div>",
  },
  selftalk: {
    emoji: "🗣️💭🙂",
    text:
      "<div class='white-card'><strong>Calm mind!</strong><br/>You said: “I can try differently.” That lowered pressure and gave you options.</div>" +
      "<div class='white-card'><strong>The science:</strong> Supportive self-talk reduces threat signals and keeps motivation alive.</div>",
  },
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function selectGender(gender) {
  currentGender = gender;
  showScreen("emotionScreen");
}

function selectEmotion(emotion) {
  currentEmotion = emotion;
  if (emotion === "frustrated") {
    document.getElementById("scenarioText").innerText =
      "You’ve tried the same homework problem three times. It still won’t work, the page smudges, and you want to crumple it.";
    showScreen("scenarioScreen");
  }
}

function showNegativeResult() {
  showScreen("negativeResultScreen");
}

function showPositiveChoices() {
  showScreen("positiveChoicesScreen");
}

function showPositiveResult(choice) {
  const data = positiveResults[choice];
  document.getElementById("positiveEmoji").textContent = data.emoji;
  document.getElementById("positiveResultText").innerHTML = data.text;
  showScreen("positiveResultScreen");
}

console.log("Frustrated mini-program loaded ✅");
