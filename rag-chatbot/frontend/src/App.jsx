import { useState } from 'react';
import axios from 'axios';
import ChatBox from './components/ChatBox'; // Corrected import
import InputBox from './components/InputBox';
import Header from './components/Header';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    const newMessage = { text: message, sender: 'user' };
    setMessages([...messages, newMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', { message });
      const botMessage = { text: response.data.response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Oops! Something went wrong.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBox onSend={sendMessage} />
    </div>
  );
}

export default App;