import React from "react";

const Sidebar = ({ activeRoomId, joinRoomExclusively, rooms }) => {
  return (
    <aside className="col-span-4 bg-gray-100 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold p-4">Chats</h1>
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className={`p-4 border-b cursor-pointer ${
              activeRoomId === room.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => joinRoomExclusively(room.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{room.name}</span>
                <p className="text-sm text-gray-600">{room.lastMessage}</p>
              </div>
              <div className="text-xs text-gray-500">{room.timestamp}</div>
            </div>
            {room.unread > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 float-right">
                {room.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
