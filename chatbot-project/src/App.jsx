import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import { ChatMessage } from "./components/ChatMessage";
import ChatMessages from "./components/ChatMessages";
import { InitialDisplayText } from "./components/InitialDisplayText";
import "./App.css";

function App() {
  const [chatMessagesVar, setChatMessagesVar] = useState(
    JSON.parse(localStorage.getItem("messages")) || [],
  );
  useEffect(() => {
    Chatbot.addResponses({
      fawk: "wetin you dey think tho",
      nigga: "what's good yn",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessagesVar));
    console.log(localStorage.getItem("messages"));
  }, [chatMessagesVar]);

  return (
    <div className="app-container">
      <InitialDisplayText chatMessagesVar={chatMessagesVar} />

      <ChatMessages chatMessagesVar={chatMessagesVar} />
      <ChatInput
        chatMessagesVar={chatMessagesVar}
        setChatMessagesVar={setChatMessagesVar}
      />
    </div>
  );
}

export default App;
