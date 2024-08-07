import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function AESComponent() {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [copyStatus, setCopyStatus] = useState({
    text: false,
    key: false,
    iv: false,
  });
  const [encryptStatus, setEncryptStatus] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = async () => {
    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-CBC",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      const iv = window.crypto.getRandomValues(new Uint8Array(16));

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv: iv,
        },
        key,
        data
      );

      const encryptedArray = new Uint8Array(encryptedBuffer);
      const encryptedHex = Array.prototype.map
        .call(encryptedArray, (x) => ("00" + x.toString(16)).slice(-2))
        .join("");

      const keyData = await window.crypto.subtle.exportKey("raw", key);
      const keyHex = Array.prototype.map
        .call(new Uint8Array(keyData), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");

      setEncryptedText(encryptedHex);
      setKey(keyHex);
      setIv(
        Array.prototype.map
          .call(iv, (x) => ("00" + x.toString(16)).slice(-2))
          .join("")
      );

      setEncryptStatus(true);
      setTimeout(() => {
        setEncryptStatus(false);
      }, 2000);
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  const handleCopyClick = (textType, text, duration = 2000) => {
    navigator.clipboard.writeText(text);
    setCopyStatus((prevState) => ({ ...prevState, [textType]: true }));
    setTimeout(() => {
      setCopyStatus((prevState) => ({ ...prevState, [textType]: false }));
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
        onClick={handleEncryptButtonClick}
        className="relative px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        {encryptStatus ? (
          <>
            <span className="mr-2">Encrypted</span>
            <i className="fas fa-check"></i>
          </>
        ) : (
          "Encrypt Text"
        )}
      </button>
      {encryptedText && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Encrypted Text:</label>
          <textarea
            value={encryptedText}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyClick("text", encryptedText)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus.text ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy Encrypted Text"
            )}
          </button>
        </div>
      )}
      {key && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Key:</label>
          <textarea
            value={key}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyClick("key", key)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus.key ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy Key"
            )}
          </button>
        </div>
      )}
      {iv && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">IV:</label>
          <textarea
            value={iv}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyClick("iv", iv)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus.iv ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy IV"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default AESComponent;
