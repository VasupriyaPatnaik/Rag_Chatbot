import { useState } from 'react';

function InputBar({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
      {/* Microphone button placeholder (functionality can be added later) */}
      <button type="button" className="mic-button">
        🎤
      </button>
    </form>
  );
}

export default InputBar;