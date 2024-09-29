import React from "react";

const Sidebar = ({ activeRoomId, joinRoomExclusively }) => {
  return (
    <aside className="col-span-4 px-8 h-screen overflow-y-auto">
      <h1>Sidebar</h1>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            className={`p-2 cursor-pointer ${
              activeRoomId === i + 1
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
            key={i}
            onClick={() => joinRoomExclusively(i + 1)}
          >
            Room #{i + 1}
          </div>
        ))}
    </aside>
  );
};

export default Sidebar;
