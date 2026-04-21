const chat = document.getElementById("chat");
const input = document.getElementById("input");

// Load history
let messages = JSON.parse(localStorage.getItem("chat")) || [];
messages.forEach(m => addMessage(m.text, m.type));

// Send message
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    save(text, "user");

    input.value = "";

    botReply(text);
}

// Add message
function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerText = text;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Save to localStorage
function save(text, type) {
    messages.push({ text, type });
    localStorage.setItem("chat", JSON.stringify(messages));
}

// Bot logic
function botReply(userText) {

    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerText = "Typing...";
    chat.appendChild(typing);

    setTimeout(() => {

        typing.remove();

        const reply = getResponse(userText);

        addMessage(reply, "bot");
        save(reply, "bot");

    }, 1000);
}

// Smart responses
function getResponse(text) {
    text = text.toLowerCase();

    if (text.includes("hello")) return "Hi! How can I help you?";
    if (text.includes("price")) return "Prices depend on your requirements.";
    if (text.includes("help")) return "Sure! Tell me what you need.";
    if (text.includes("bye")) return "Goodbye! Have a great day.";

    return "I'm just a demo AI, but I'm learning!";
}