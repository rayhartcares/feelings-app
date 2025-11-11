let currentGender = '';
let currentEmotion = '';

const positiveResults = {
  talk: {
    emoji: "💬😊🤝",
    text: "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 15px;'><strong style='font-size: 1.3em;'>Great Communication!</strong><br><br>You used 'I' statements to express your feelings without attacking the other person. They understood how you felt and apologized.</div><div style='background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a1a; padding: 20px; border-radius: 12px; font-weight: 600;'><strong style='font-size: 1.2em;'>The Science:</strong><br><br>Using calm communication releases oxytocin, the 'bonding hormone,' which helps build trust and understanding. When you express feelings without blame, people are more likely to listen and respond positively. The person felt bad and promised to be more careful with your things in the future. Your friendship is stronger now!</div>"
  },
  breathe: {
    emoji: "🌬️😌✨",
    text: "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 15px;'><strong style='font-size: 1.3em;'>Excellent Choice!</strong><br><br>You took deep breaths and calmed down. This gave your brain time to think clearly instead of reacting with anger.</div><div style='background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a1a; padding: 20px; border-radius: 12px; font-weight: 600;'><strong style='font-size: 1.2em;'>The Science:</strong><br><br>Deep breathing activates your parasympathetic nervous system, which calms your body down. It reduces stress hormones and helps you think more clearly. After calming down, you were able to talk to the person calmly, and they apologized and offered to replace your pencil. You feel proud of yourself for staying in control!</div>"
  },
  help: {
    emoji: "👨‍🏫🌟😊",
    text: "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 15px;'><strong style='font-size: 1.3em;'>Smart Decision!</strong><br><br>You recognized when you needed help and asked a trusted adult. This shows maturity and wisdom.</div><div style='background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a1a; padding: 20px; border-radius: 12px; font-weight: 600;'><strong style='font-size: 1.2em;'>The Science:</strong><br><br>Seeking help when needed is a sign of emotional intelligence. It prevents situations from escalating and ensures fair resolution. The teacher helped mediate the situation, the person apologized, and you both learned better ways to handle conflicts. Asking for help is always a brave and positive choice!</div>"
  },
  understand: {
    emoji: "🤝💡✨",
    text: "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 15px;'><strong style='font-size: 1.3em;'>Empathy Success!</strong><br><br>You chose to see things from their perspective. Maybe they didn't mean to break it, or they were having a bad day.</div><div style='background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: #1a1a1a; padding: 20px; border-radius: 12px; font-weight: 600;'><strong style='font-size: 1.2em;'>The Science:</strong><br><br>Empathy activates the prefrontal cortex and helps reduce anger by shifting focus from blame to understanding. When you try to understand others, it builds emotional intelligence and stronger relationships. The person explained they accidentally dropped it and felt terrible. You both talked it through, they apologized sincerely, and your friendship grew stronger through understanding!</div>"
  }
};

function selectGender(gender) {
  currentGender = gender;
  showScreen('emotionScreen');
}

function selectEmotion(emotion) {
  currentEmotion = emotion;
  if (emotion === 'angry') {
    showScreen('scenarioScreen');
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

function showNegativeResult() {
  showScreen('negativeResultScreen');
}

function showPositiveChoices() {
  showScreen('positiveChoicesScreen');
}

function showPositiveResult(choice) {
  const result = positiveResults[choice];
  document.getElementById('positiveEmoji').textContent = result.emoji;
  document.getElementById('positiveResultText').innerHTML = result.text;
  showScreen('positiveResultScreen');
}
