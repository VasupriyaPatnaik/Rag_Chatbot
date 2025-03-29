import Loader from './Loader';

function ChatBox({ messages, isLoading }) {
  return (
    <div className="chat-box">
      {messages.length === 0 && (
        <div className="empty-message">Start a conversation!</div>
      )}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
        >
          {msg.text}
        </div>
      ))}
      {isLoading && <Loader />}
    </div>
  );
}

export default ChatBox;