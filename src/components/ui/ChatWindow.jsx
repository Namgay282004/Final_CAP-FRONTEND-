import React from 'react';

const ChatWindow = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mb-4 ${message.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`p-2 rounded-lg ${message.sender === currentUser.name ? 'bg-blue-500 text-white' : 'bg-yellow-200 text-black'}`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;