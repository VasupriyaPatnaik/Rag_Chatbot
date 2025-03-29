function ChatBox({ messages, isLoading }) {
    return (
      <div className="chat-box">
        {messages.length === 0 && (
          <div className="empty-message">Hello! How can I assist you today?</div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="loading">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
    );
  }
  
  export default ChatBox;