
const body = document.body;
const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector(".input-box input");
const chatBox = document.querySelector(".chat-box");

// Send message on button click
sendBtn.addEventListener("click", sendMessage);

// Send message on Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.response) {
        appendMessage("bot", data.response);
      } else {
        appendMessage("bot", "Bir hata oluştu.");
      }
    })
    .catch(() => {
      appendMessage("bot", "Sunucuya ulaşılamadı.");
    });
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("chat-message", sender);

  const strong = document.createElement("strong");
  strong.textContent = sender === "user" ? "Sen" : "EBFL AI";

  const p = document.createElement("p");
  p.textContent = text;

  div.appendChild(strong);
  div.appendChild(p);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveChatHistory() {
  localStorage.setItem("chatHistory", chatBox.innerHTML);
}

function loadChatHistory() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) chatBox.innerHTML = saved;
}

// Load saved history on page load
document.addEventListener("DOMContentLoaded", loadChatHistory);

// Save chat after each message
function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("chat-message", sender);

  const strong = document.createElement("strong");
  strong.textContent = sender === "user" ? "Siz" : "EBFL AI";

  const p = document.createElement("p");
  p.textContent = text;

  div.appendChild(strong);
  div.appendChild(p);

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  saveChatHistory(); // Save after adding message
}
