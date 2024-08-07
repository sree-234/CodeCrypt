import React from 'react';

const ProgressButton = ({ onClick, progress, isCompleted, disabled }) => {
  let buttonClass = 'text-sm px-2 py-1 rounded';
  if (isCompleted) {
    buttonClass += ' bg-green-500 text-white';
  } else if (disabled) {
    buttonClass += ' bg-gray-300 text-gray-600 cursor-not-allowed';
  } else {
    buttonClass += ' bg-blue-500 text-white';
  }

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      disabled={disabled || isCompleted}
    >
      Mark as Studied
    </button>
  );
};

export default ProgressButton;
