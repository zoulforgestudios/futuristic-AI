// === Zoul Voice System ===
let isListening = false;
let recognition;
let zoulCore = document.getElementById("zoul-core");

export function initZoulVoice() {
  // Web Speech API
  if (!("webkitSpeechRecognition" in window)) {
    console.error("Speech recognition not supported");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    stopListening();
    await handleZoulCommand(transcript);
  };

  recognition.onend = () => { if (isListening) recognition.start(); };

  // Hot-word polling
  startWakeWord();
}

function startWakeWord() {
  const wake = new webkitSpeechRecognition();
  wake.lang = "en-US";
  wake.continuous = true;
  wake.interimResults = true;
  wake.onresult = (e) => {
    const txt = e.results[e.results.length - 1][0].transcript.toLowerCase();
    if (txt.includes("hey zoul")) {
      console.log("Wake word detected");
      wake.stop();
      startListening();
    }
  };
  wake.start();
}

function startListening() {
  isListening = true;
  zoulCore.classList.add("listening");
  recognition.start();
}

function stopListening() {
  isListening = false;
  zoulCore.classList.remove("listening");
  recognition.stop();
}

async function handleZoulCommand(text) {
  zoulCore.classList.add("thinking");

  // --- send to Chatbase ---
  const res = await fetch("https://api.chatbase.co/api/v1/message", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_CHATBASE_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input: text })
  });
  const data = await res.json();

  speakZoul(data.output_text);
}

function speakZoul(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1.1;
  synth.speak(utter);

  utter.onend = () => {
    zoulCore.classList.remove("thinking");
    startWakeWord(); // back to idle
  };
}
