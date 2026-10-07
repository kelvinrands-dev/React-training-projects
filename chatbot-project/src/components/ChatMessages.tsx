import { useAutoScroll } from "../hooks/useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

type ChatMessagesProps = {
  chatMessagesVar: {
    id: string;
    message: string;
    sender: string;
  }[];
};

function ChatMessages({ chatMessagesVar }: ChatMessagesProps) {
  const chatMessagesRef = useAutoScroll(chatMessagesVar);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessagesVar.map((chaMess) => {
        return (
          <ChatMessage
            message={chaMess.message}
            sender={chaMess.sender}
            key={chaMess.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
