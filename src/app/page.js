"use client";
import React, { useState, useEffect } from "react";
import ChatHistory from "../components/ui/ChatHistory";
import ChatWindow from "../components/ui/ChatWindow";
import InputField from "../components/ui/InputField";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Namgay Wangs",
  });
  const [chatPartner, setChatPartner] = useState(null);
  const [socket, setSocket] = useState(null);
  const users = [
    { id: 2, name: "Dupchu Wangmo" },
    { id: 3, name: "Karma Wangs" },
    { id: 4, name: "Sangay Wangs" },
    { id: 5, name: "Tshering Wangs" },
  ];

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      // Only show messages that are either from or to the current chat partner
      if (
        (receivedMessage.sender === currentUser.name &&
          receivedMessage.receiver === chatPartner.name) ||
        (receivedMessage.sender === chatPartner.name &&
          receivedMessage.receiver === currentUser.name)
      ) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    return () => ws.close();
  }, [chatPartner]);

  const sendMessage = () => {
    if (socket && message && chatPartner && chatPartner.id !== currentUser.id) {
      const msg = {
        text: message,
        sender: currentUser.name,
        receiver: chatPartner.name,
      };
      socket.send(JSON.stringify(msg));
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage("");
    }
  };

  const handleSelectUser = (user) => {
    if (user.id !== currentUser.id) {
      setChatPartner(user);
      // Clear previous messages when a new user is selected
      setMessages([]);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatHistory users={users} onSelectUser={handleSelectUser} />
      {chatPartner && (
        <div className="flex flex-col w-3/4">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-xl font-bold">{chatPartner.name}</div>
            <div className="text-xl font-bold">{currentUser.name}</div>
          </div>
          <ChatWindow messages={messages} currentUser={currentUser} />
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
};



export default ChatPage;