import { useState } from 'react';
import ChatBox from '../components/ChatBox';
import InputBar from '../components/InputBar';
import { sendMessageToBackend } from '../api';

function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    const newMessage = { text: message, sender: 'user' };
    setMessages([...messages, newMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageToBackend(message);
      const botMessage = { text: response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Error: Could not reach the server.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>RAG Chatbot</h1>
        <p>Intelligent Assistance at Your Fingertips</p>
      </header>
      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSendMessage} />
    </div>
  );
}

export default Home;