const { ipcRenderer, remote } = require("electron");

const micBtn = document.getElementById("micBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chat-box");
const closeBtn = document.getElementById("closeBtn");

// Close button → window band karega
closeBtn.addEventListener("click", () => {
  const window = require("electron").remote.getCurrentWindow();
  window.close();
});

// Mic button → backend se speech-to-text
micBtn.addEventListener("click", async () => {
  addMessage("🎤 Listening...", "bot");

  try {
    const res = await fetch("http://localhost:5001/speech-to-text");
    const data = await res.json();
    if (data.transcript) {
      addMessage(data.transcript, "user");
      await sendMessage(data.transcript);
    } else {
      addMessage("⚠️ Could not recognize speech.", "bot");
    }
  } catch (err) {
    addMessage("❌ Error: " + err.message, "bot");
  }
});

// User input → backend se chat
userInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && userInput.value.trim() !== "") {
    const msg = userInput.value;
    addMessage(msg, "user");
    userInput.value = "";
    await sendMessage(msg);
  }
});

async function sendMessage(message) {
  try {
    const res = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    if (data.reply) {
      addMessage("🤖 " + data.reply, "bot");
    } else {
      addMessage("⚠️ No reply from server.", "bot");
    }
  } catch (err) {
    addMessage("❌ Error: " + err.message, "bot");
  }
}

function addMessage(text, sender) {
  const p = document.createElement("p");
  p.textContent = text;
  p.className = sender;
  chatBox.appendChild(p);

  // Naya message aate hi scroll bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

closeBtn.addEventListener("click", () => {
  window.close(); // Electron window band
});

// Shortcut mic trigger (Ctrl+M)
const { ipcRenderer: ipc } = require("electron");
ipc.on("mic-shortcut", () => {
  micBtn.click();
});
