import React from 'react';

const ChatWindow = ({ messages, currentUser }) => (
  <div className="flex flex-col space-y-4">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`flex ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`inline-block p-2 rounded-lg ${msg.sender === currentUser.name ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
          {msg.text}
        </div>
      </div>
    ))}
  </div>
);

export default ChatWindow;
