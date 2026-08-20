import { useRef, useEffect } from "react";

function useAutoScroll(chatMessagesVar) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessagesVar]);

  return chatMessagesRef;
}

export { useAutoScroll };
