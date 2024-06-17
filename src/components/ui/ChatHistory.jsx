import React from 'react';
import { Avatar } from './avatar';

const ChatHistory = ({ users, onSelectUser }) => (
  <div className="flex-1 overflow-auto">
    {users.map(user => (
      <div
        key={user.id}
        className="flex items-center p-4 cursor-pointer hover:bg-gray-800"
        onClick={() => onSelectUser(user)}
      >
        <Avatar className="h-10 w-10" />
        <div className="ml-4">{user.name}</div>
      </div>
    ))}
  </div>
);

export default ChatHistory;
