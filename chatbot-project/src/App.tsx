import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { InitialDisplayText } from "./components/InitialDisplayText";
import "./App.css";
import WebIcon from "./assets/robot.png";

function App() {
  const [chatMessagesVar, setChatMessagesVar] = useState(
    JSON.parse(localStorage.getItem("messages")!) || [],
  );
  const [numOfMessages, setNumOfMessages] = useState(
    Number(localStorage.getItem("messagesNum")) || 0,
  );
  console.log(
    `Num of messages being recieved rn in App.jsx is ${numOfMessages}`,
  );

  useEffect(() => {
    Chatbot.addResponses({
      fawk: "wetin you dey think tho",
      nigga: "what's good yn",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessagesVar));
    // console.log(localStorage.getItem("messages"));
  }, [chatMessagesVar]);

  return (
    <div className="app-container">
      <title>
        {numOfMessages === 0 ? "Chatbot Project" : `${numOfMessages} Messages`}
      </title>
      <link rel="icon" type="image/svg+xml" href={WebIcon} />

      <InitialDisplayText chatMessagesVar={chatMessagesVar} />

      <ChatMessages chatMessagesVar={chatMessagesVar} />
      <ChatInput
        chatMessagesVar={chatMessagesVar}
        setChatMessagesVar={setChatMessagesVar}
        numOfMessages={numOfMessages}
        setNumOfMessages={setNumOfMessages}
      />
    </div>
  );
}

export default App;
