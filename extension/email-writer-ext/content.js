console.log("AI Email Writer Extension Loaded");

function createAIButton() {
  const button = document.createElement("div");

  button.innerText = "AI Reply";

  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";

  button.style.marginLeft = "8px";

  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI reply");

  return button;
}

function getEmailContent() {
  const emailBody = document.querySelector(".a3s.aiL");
  return emailBody ? emailBody.innerText.trim() : "";
}

function insertText(text, composeBox) {
  composeBox.focus();
  composeBox.innerText = text;
}

async function generateReply(button, composeBox) {
  try {
    button.innerText = "Generating...";
    button.disabled = true;

    const emailContent = getEmailContent();

    const response = await fetch("http://localhost:8080/api/email/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailContent,
        tone: "professional",
      }),
    });

    if (!response.ok) throw new Error("API failed");

    const generatedReply = await response.text();
    insertText(generatedReply, composeBox);
  } catch (error) {
    console.error(error);
    alert("Failed to generate reply");
  } finally {
    button.innerText = "AI Reply";
    button.disabled = false;
  }
}
function injectButton() {
  const sendButtons = document.querySelectorAll(
    'div[role="button"][data-tooltip^="Send"]',
  );

  sendButtons.forEach((sendButton) => {
    const parent = sendButton.parentElement;

    if (!parent) return;

    if (parent.querySelector(".ai-reply-button")) return;

    console.log("Injecting next to Send button");

    const button = createAIButton();

    const composeBox = document.querySelector(
      '[role="textbox"][contenteditable="true"]',
    );

    button.addEventListener("click", () => generateReply(button, composeBox));

    parent.appendChild(button);
  });
}

const observer = new MutationObserver(() => {
  injectButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
