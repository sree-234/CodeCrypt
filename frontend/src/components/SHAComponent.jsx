import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SHAComponent() {
  const [inputText, setInputText] = useState("");
  const [hash, setHash] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const [hashStatus, setHashStatus] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleHashButtonClick = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);
    setHashStatus(true);
    setTimeout(() => {
      setHashStatus(false);
    }, 2000);
  };

  const handleCopyClick = (text, duration = 2000) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, duration);
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleHashButtonClick}
        className="relative px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        {hashStatus ? (
          <>
            <span className="mr-2">Hashed</span>
            <i className="fas fa-check"></i>
          </>
        ) : (
          "Hash Text"
        )}
      </button>
      {hash && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Hash:</label>
          <textarea
            value={hash}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyClick(hash)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy Hash"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default SHAComponent;
