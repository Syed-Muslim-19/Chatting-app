const socket = io();
let name;
do {
  name = prompt("Enter Your Name");
} while (!name);
document.getElementById("send-button").addEventListener("click", function () {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value.trim();
  if (messageText !== "") {
    const messageData = {
      user: name,
      message: messageText,
    };
    socket.emit("message", messageData);
    appendMessage(messageData, "sent");
    messageInput.value = "";
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

function appendMessage(messageData, type) {
  const messageBlock = document.createElement("div");
  messageBlock.className = `message-block ${type}`;
  const userNameElement = document.createElement("strong");
  userNameElement.className = "user-name";
  userNameElement.innerText = messageData.user;
  const messageContainer = document.createElement("div");
  messageContainer.className = `message ${type}`;
  messageContainer.innerText = messageData.message;
  messageBlock.appendChild(userNameElement);
  messageBlock.appendChild(messageContainer);
  document.getElementById("chat-messages").appendChild(messageBlock);
}

socket.on("message", (messageData) => {
  appendMessage(messageData, "received");
});
