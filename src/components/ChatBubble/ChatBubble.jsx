import "./ChatBubble.css";

function ChatBubble({ texto, linkVisual = false }) {
  return (
    <div className={`chat-bubble golpista ${linkVisual ? "chat-bubble--link" : ""}`.trim()}>
      <p>{texto}</p>
    </div>
  );
}

export default ChatBubble;
