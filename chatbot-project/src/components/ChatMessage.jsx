import dayjs from "dayjs";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/john agbadoe.jpg";
import "./ChatMessage.css";

function ChatMessage({ message, sender }) {
  const time = dayjs().valueOf();
  const currentTime = dayjs(time).format("HH:mm");
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img className="chat-message-profile" src={RobotProfileImage} />
      )}

      <div className="chat-message-text">
        <div>{message}</div>
        <div className="time">{`${currentTime}pm`}</div>
      </div>

      {sender === "user" && (
        <img className="chat-message-profile" src={UserProfileImage} />
      )}
    </div>
  );
}

export { ChatMessage };
