import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <div
      className="relative w-full h-full p-4 overflow-y-auto"
      style={{
        backgroundImage: "url('/bgImg.png')", 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        backgroundBlendMode: 'overlay',
      }}
    >
      {messages.map(({ message, userName }, index) => (
        <div
          className={`w-full px-4 py-2 mb-2 ${
            userName === "You" ? "text-right" : "text-left"
          }`}
          key={index}
        >
          <div
            className={`inline-block rounded-lg px-4 py-2 shadow-md ${
              userName === "You" ? "bg-green-200 text-gray-800" : "bg-white border"
            }`}
          >
            <p className="font-bold text-sm">{userName}</p>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
