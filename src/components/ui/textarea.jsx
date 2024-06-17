import React from 'react';

export const Textarea = ({ className, ...props }) => (
  <textarea className={`border-none rounded p-2 ${className}`} {...props} />
);
