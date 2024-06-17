import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button className={`rounded p-2 ${className}`} {...props}>
    {children}
  </button>
);
