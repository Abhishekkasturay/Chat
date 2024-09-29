import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Make sure the path is correct for your project

export default function App() {
  const [activeRoomId, setActiveRoomId] = useState(null);

  function joinRoomExclusively(roomId) {
    setActiveRoomId(roomId); // Set the active room when a user clicks on it
  }

  return (
    <div className="grid grid-cols-12 h-screen">
      <Sidebar activeRoomId={activeRoomId} joinRoomExclusively={joinRoomExclusively} />
      {/* Add your ChatWindow and other components for the main area */}
      <main className="col-span-8 p-4">
        <h1 className="text-3xl font-bold">Chat Room #{activeRoomId}</h1>
        {/* Chat window and other components */}
      </main>
    </div>
  );
}
