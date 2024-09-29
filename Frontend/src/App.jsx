import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { produce, enableMapSet } from "immer";
import Sidebar from "./Components/Sidebar";
import ChatWindow from "./Components/ChatWindow";
import TypingIndicator from "./Components/TypingIndicator";
import MessageInput from "./Components/MessageInput";

enableMapSet();

const socketURL =
  process.env.REACT_APP_SOCKET_URL || "https://chat-apps-2-3juo.onrender.com";

export default function App() {
  const [mySocket, setMySocket] = useState(null);
  const [roomIdToMapping, setRoomIdToMapping] = useState({});
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const isPromptAlert = useRef(false);
  const [userTypingMapping, setUserTypingMapping] = useState({});
  const [userTypingTimeOutMapping, setUserTypingTimeOutMapping] = useState({});

  useEffect(() => {
    if (!isPromptAlert.current) {
      isPromptAlert.current = true;
      while (true) {
        const ValidUserName = window.prompt("Enter your Name");
        if (ValidUserName?.trim()) {
          setUserName(ValidUserName);
          break;
        }
      }
    }

    const socket = io(socketURL, { transports: ["websocket"] });
    setMySocket(socket);

    socket.on("roomMessage", (data) => {
      setRoomIdToMapping(
        produce((state) => {
          state[data.roomId] = state[data.roomId] || [];
          if (
            !state[data.roomId].some((obj) => obj.messageId === data.messageId)
          ) {
            state[data.roomId].push(data);
          }
        })
      );
    });

    socket.on("userTyping", (data) => {
      const { roomId, userName } = data;

      setUserTypingMapping(
        produce((state) => {
          state[roomId] = state[roomId] || new Set();
          state[roomId].add(userName);
        })
      );

      const timeOutId = setTimeout(() => {
        setUserTypingMapping(
          produce((state) => {
            state[roomId] = state[roomId] || new Set();
            state[roomId].delete(userName);
          })
        );
      }, 5000);
      setUserTypingTimeOutMapping(
        produce((state) => {
          clearTimeout(state[roomId + "-" + userName]);
          state[roomId + "-" + userName] = timeOutId;
        })
      );
    });

    return () => {
      socket.close();
    };
  }, []);

  function joinRoomExclusively(roomId) {
    if (mySocket == null) return;
    setActiveRoomId(roomId);
    mySocket.emit("joinRoomExclusively", roomId);
  }

  function sendMessage() {
    if (mySocket == null || typeof activeRoomId !== "number") {
      alert("Please select a room before sending a message");
      return;
    }
    mySocket.emit("sendMessage", { roomId: activeRoomId, message, userName });
    setMessage("");
  }

  function sendTypingIndicator() {
    if (mySocket == null || typeof activeRoomId !== "number") {
      alert("Please select a room before sending a message");
      return;
    }
    mySocket.emit("sendTypingIndicator", { roomId: activeRoomId, userName });
  }

  const messageOfRoom = roomIdToMapping[activeRoomId] || [];
  const typingUserInRoom =
    userTypingMapping[activeRoomId] != null
      ? [...userTypingMapping[activeRoomId]]
      : [];

  if (mySocket == null) return null;

  return (
    <div className="grid grid-cols-12 divide-x divide-gray-300">
      <Sidebar
        activeRoomId={activeRoomId}
        joinRoomExclusively={joinRoomExclusively}
      />
      <main className="col-span-8 px-8 h-screen overflow-y-auto flex flex-col">
        <p>Your username: {userName}</p>
        <TypingIndicator typingUsers={typingUserInRoom} />
        <ChatWindow messages={messageOfRoom} />
        <div className="flex-grow" />
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          sendTypingIndicator={sendTypingIndicator}
        />
      </main>
    </div>
  );
}
