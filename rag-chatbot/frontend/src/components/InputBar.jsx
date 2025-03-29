import { useState } from 'react';

function InputBox({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question..."
        className="chat-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}

export default InputBox;