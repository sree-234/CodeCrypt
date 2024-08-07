import React, { useState } from 'react';

const AlgorithmCard = ({ title, details, onClick, completed }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = `
    relative 
    group 
    p-4 
    rounded-lg 
    shadow-md 
    cursor-pointer 
    overflow-hidden 
    transition 
    duration-300 
    transform 
    hover:scale-105
    bg-white dark:bg-zinc-800  
  `;

  // No conditional color for title
  const titleStyles = `
    text-lg 
    font-semibold 
    text-zinc-800 dark:text-zinc-200
  `;

  // No conditional color for details
  const detailsStyles = `
    hidden 
    group-hover:block 
    text-sm 
    mt-2 
    text-zinc-600 dark:text-zinc-400
  `;

  return (
    <div
      className={cardStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className={titleStyles}>{title}</h3>
      {(isHovered || completed) && <p className={detailsStyles}>{details}</p>} 

      {completed && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-tr-lg">
          <span className="text-xs font-semibold">Completed</span>
        </div>
      )}
    </div>
  );
};

export default AlgorithmCard;
