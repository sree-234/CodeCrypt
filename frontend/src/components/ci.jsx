import React, { useRef } from 'react';

const CopyableInput = ({ id, label }) => {
  const inputRef = useRef(null);

  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
    alert(`Copied the text: ${inputRef.current.value}`);
  };

  return (
    <div className="flex items-center">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mr-2">{label}</label>
      <input id={id} ref={inputRef} type="text" className="flex-1 p-2.5 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-md border border-zinc-300 dark:border-zinc-700" readOnly />
      <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ml-2">Copy</button>
    </div>
  );
};

export default CopyableInput;