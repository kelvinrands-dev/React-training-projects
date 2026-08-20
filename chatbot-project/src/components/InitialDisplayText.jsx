function InitialDisplayText({ chatMessagesVar }) {
  if (chatMessagesVar.length !== 0) return;

  return (
    <div className="initial-display-text">
      Welcome to the chatbot project! Send a message using the textbox below.
    </div>
  );
}

export { InitialDisplayText };
