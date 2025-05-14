// src/pages/screen-guides/chat-room.tsx
import React from "react";




import screenshot from "@/assets/screenshots/chat-room.png";

const ChatRoomGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Chat Room</h1>
      <p>Supports anonymous or authenticated discussions between patients and providers or among admins.</p>

      <h2>Screenshot</h2>
      <img src={screenshot} alt="Chat room screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>WebSocket-powered real-time messages</li>
        <li>User avatars and roles</li>
        <li>Timestamped conversations and pinned messages</li>
      </ul>
    </div>
  );
};

export default ChatRoomGuide;
