import "./ChatBubble.css";

function ChatBubble({ texto }) {
  return (
    <div className="chat-bubble golpista">
      <p>{texto}</p>
    </div>
  );
}

export default ChatBubble;