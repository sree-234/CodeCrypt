import React, { useRef, useState, useEffect } from 'react';

const CopyableInput = ({ value }) => {
  const textAreaRef = useRef(null);
  const [buttonText, setButtonText] = useState('Copy');
  const [buttonColor, setButtonColor] = useState('bg-blue-500');
  const [buttonHoverColor, setButtonHoverColor] = useState('hover:bg-blue-700');

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setButtonText('Copied');
    setButtonColor('bg-green-500');
    setButtonHoverColor('hover:bg-green-700');

    setTimeout(() => {
      alert('Code copied to clipboard');
      setTimeout(() => {
        setButtonText('Copy');
        setButtonColor('bg-blue-500');
        setButtonHoverColor('hover:bg-blue-700');
      }, 3000);
    }, 0);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="relative">
      <textarea
        ref={textAreaRef}
        readOnly
        className="bg-gray-900 p-4 rounded-md w-full overflow-x-auto whitespace-pre-wrap"
        style={{ minHeight: '200px', maxHeight: '500px', resize: 'none' }}
        value={value}
      />
      <button
        onClick={handleCopy}
        className={`absolute top-0 right-0 mt-2 mr-2 px-2 py-1 text-white rounded-md ${buttonColor} ${buttonHoverColor}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CopyableInput;