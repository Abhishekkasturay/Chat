import React from "react";

const MessageInput = ({
  message,
  setMessage,
  sendMessage,
  sendTypingIndicator,
}) => {
  return (
    <div className="mb-8 flex justify-center items-center gap-2">
      <textarea
        id="about"
        name="about"
        rows="2"
        className="block w-full mb-8 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex-grow"
        value={message}
        onChange={(e) => {
          sendTypingIndicator();
          setMessage(e.target.value);
        }}
      />
      <button
        type="button"
        className="flex-shrink-0 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default MessageInput;
