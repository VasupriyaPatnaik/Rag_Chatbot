const BASE_URL = "http://localhost:5000";

export const sendMessageToBackend = async (message) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    return { response: "Error connecting to backend." };
  }
};
