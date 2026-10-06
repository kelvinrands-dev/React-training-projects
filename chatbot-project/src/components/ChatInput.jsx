import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import SpinnerImage from "../assets/loading-spinner.gif";
import "./ChatInput.css";

function ChatInput({
  chatMessagesVar,
  setChatMessagesVar,
  numOfMessages,
  setNumOfMessages,
}) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("messagesNum", numOfMessages);
  }, [numOfMessages]);

  const saveInputText = (e) => {
    setInputText(e.target.value);
  };

  async function sendMessage() {
    if (inputText === "") {
      alert("Enter a message");
      return;
    }
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const newChatMessages = [
      ...chatMessagesVar,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessagesVar(newChatMessages);
    setInputText("");

    setChatMessagesVar([
      ...newChatMessages,
      {
        message: <img className="loading-spinner" src={SpinnerImage} />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessagesVar([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setIsLoading(false);

    setNumOfMessages(numOfMessages + 1);

    //console.log(localStorage.getItem("messagesNum"));
    //console.log(`Num of messages after send is ${numOfMessages}`);
  }

  function keyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
    if (e.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessage() {
    setChatMessagesVar([]);
    setNumOfMessages(0);
    localStorage.removeItem("messagesNum");
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={keyDown}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-btn">
        Send
      </button>

      <button onClick={clearMessage} className="clear-btn">
        Clear
      </button>
    </div>
  );
}

export { ChatInput };
