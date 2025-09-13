const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendChat: async (message) => {
    const res = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    return res.json();
  },
  speechToText: async () => {
    const res = await fetch("http://localhost:5001/speech-to-text");
    return res.json();
  },
});
