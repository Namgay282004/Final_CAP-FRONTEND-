"use client";
import React, { useState, useEffect } from "react";
import ChatHistory from "../components/ui/ChatHistory";
import ChatWindow from "../components/ui/ChatWindow";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({}); // Use an object to store messages for each chat partner
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Wangs",
  });
  const [chatPartner, setChatPartner] = useState(null);
  const [socket, setSocket] = useState(null);
  const users = [
    { id: 2, name: "Dupchu Wangmo" },
    { id: 3, name: "Karma Wangs" },
    { id: 4, name: "Poms" },
    { id: 5, name: "Tshering Wangs" },
  ];

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      const partnerName = receivedMessage.sender === currentUser.name
        ? receivedMessage.receiver
        : receivedMessage.sender;

      // Update messages for the sender/receiver pair
      setMessages(prevMessages => ({
        ...prevMessages,
        [partnerName]: [...(prevMessages[partnerName] || []), receivedMessage]
      }));
    };

    return () => ws.close();
  }, [currentUser.name]);

  const sendMessage = () => {
    if (socket && message && chatPartner && chatPartner.id !== currentUser.id) {
      const msg = {
        text: message,
        sender: currentUser.name,
        receiver: chatPartner.name,
      };
      socket.send(JSON.stringify(msg));
      setMessages(prevMessages => ({
        ...prevMessages,
        [chatPartner.name]: [...(prevMessages[chatPartner.name] || []), msg]
      }));
      setMessage("");
    }
  };

  const handleSelectUser = (user) => {
    if (user.id !== currentUser.id) {
      setChatPartner(user);
    }
  };

  const currentMessages = chatPartner ? messages[chatPartner.name] || [] : [];

  return (
    <div className="flex h-screen">
      <ChatHistory users={users} onSelectUser={handleSelectUser} />
      {chatPartner && (
        <div className="flex flex-col w-3/4">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <Avatar className="h-10 w-10" />
              <div className="ml-4 text-xl font-bold">{chatPartner.name}</div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10" />
              <div className="ml-4 text-xl font-bold">{currentUser.name}</div>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4 overflow-auto">
            <ChatWindow messages={currentMessages} currentUser={currentUser} />
          </ScrollArea>
          <div className="p-4 border-t flex">
            <Textarea
              className="flex-1 mr-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
