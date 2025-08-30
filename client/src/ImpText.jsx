import React from 'react';

const ImpText = ({ text }) => {
  if (!text) return null;

  const parts = text.split('*');

  return (
    <p>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="bg-indigo-500/30 text-indigo-300 px-1 rounded-sm">
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
};

export default ImpText;