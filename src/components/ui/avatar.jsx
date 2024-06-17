import React from 'react';

export const Avatar = ({ className, ...props }) => (
  <div className={`bg-gray-700 rounded-full ${className}`} {...props} />
);
