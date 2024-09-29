import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <div
      className="relative w-full h-full p-4 overflow-y-auto"
      style={{
        backgroundImage: "url('/bgImg.png')", // Ensure you reference the correct path to the image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Center the background image
        backgroundColor: "rgba(0, 0, 0, 0.75)", // Apply a dark overlay for a muted effect
        backgroundBlendMode: "darken", // Darken the background for a muted effect
        filter: "brightness(0.4)", // Adjust brightness for a darker background
      }}
    >
      {messages.map(({ message, userName }, index) => (
        <div
          key={index}
          className={`flex mb-2 ${
            userName === "You" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`inline-block max-w-xs rounded-lg px-4 py-2 shadow-md ${
              userName === "You"
                ? "bg-green-200 text-gray-800"
                : "bg-white border"
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
