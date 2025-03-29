import React from "react";
import ChatBox from "../components/ChatBox";
import InputBar from "../components/InputBar";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>RAG Chatbot</h1>
      <ChatBox />
      <InputBar />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to right, #ffafbd, #ffc3a0)",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px",
  },
};

export default Home;
