import axios from 'axios';

const API_URL = 'http://localhost:5000/chat';

export const sendMessageToBackend = async (message) => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data.response; // Assumes backend returns { response: "text" }
  } catch (error) {
    throw new Error('Failed to fetch response from backend');
  }
};