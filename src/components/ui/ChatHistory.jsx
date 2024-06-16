import React from 'react';

const ChatHistory = ({ users, onSelectUser }) => {
  return (
    <div className="w-1/4 border-r p-4">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectUser(user)}
        >
          <div className="avatar w-10 h-10 mr-2 bg-gray-300 rounded-full flex items-center justify-center">
            {user.name[0]}
          </div>
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;