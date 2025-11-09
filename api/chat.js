// ZOUL LOGIC
async function zoulSendText(text){
  addMsg("user", text);

  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const j = await r.json();
  const reply = j.reply || "…";
  addMsg("assistant", reply);

  speak(reply);
}

// Add message bubble
function addMsg(sender, text){
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");

  div.style.margin = "10px 0";
  div.style.padding = "10px";
  div.style.borderRadius = "10px";
  div.style.maxWidth = "80%";

  if(sender === "user"){
    div.style.marginLeft = "auto";
    div.style.background = "#8a5cff";
  } else {
    div.style.background = "#161b23";
    div.style.border = "1px solid #1a1f28";
  }

  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// Speech output
function speak(text){
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// Voice input
function startListening(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ alert("No mic support"); return; }

  const rec = new SR();
  rec.onresult = e => {
    const txt = e.results[0][0].transcript;
    zoulSendText(txt);
  };
  rec.start();
}

// Buttons
document.getElementById("sendBtn").onclick = () => {
  const t = document.getElementById("userInput").value.trim();
  if(t) zoulSendText(t);
};

document.getElementById("micBtn").onclick = () => startListening();
