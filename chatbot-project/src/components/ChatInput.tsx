import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Chatbot } from "supersimpledev";
import SpinnerImage from "../assets/loading-spinner.gif";
import "./ChatInput.css";

type Chat = {
  id: string;
  message: ReactNode;
  sender: string;
};

type ChatInputProps = {
  chatMessagesVar: Chat[];
  setChatMessagesVar: (chatMessagesVar: Chat[]) => void;
  numOfMessages: number;
  setNumOfMessages: (numOfMessages: number) => void;
};

function ChatInput({
  chatMessagesVar,
  setChatMessagesVar,
  numOfMessages,
  setNumOfMessages,
}: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("messagesNum", String(numOfMessages));
  }, [numOfMessages]);

  const saveInputText = (e: { target: { value: string } }) => {
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
  }

  function keyDown(e: { key: string }) {
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
        size={30}
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
