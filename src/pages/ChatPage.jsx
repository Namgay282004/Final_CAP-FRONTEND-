import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatHistory from '../components/ui/ChatHistory';
import ChatWindow from '../components/ui/ChatWindow';
import { Textarea, Button } from '../components/ui';
import { getMessages, sendMessage } from '../services/api';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch users and messages
    fetchUsers();
    fetchMessages();
  }, []);

  const fetchUsers = async () => {
    // Fetch users from the backend
    const usersData = await getUsers();
    setUsers(usersData);
  };

  const fetchMessages = async () => {
    // Fetch messages from the backend
    const messagesData = await getMessages();
    setMessages(messagesData);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const message = {
        sender: currentUser.name,
        recipient: selectedUser.name,
        text: newMessage,
      };
      await sendMessage(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      <ChatHistory users={users} onSelectUser={setSelectedUser} />
      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages.filter(
          (msg) => msg.sender === currentUser.name || msg.recipient === currentUser.name
        )} currentUser={currentUser} />
        <div className="p-4">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
