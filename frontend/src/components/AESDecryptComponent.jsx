import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function AESDecryptComponent() {
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);

  const handleEncryptedTextChange = (e) => {
    setEncryptedText(e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleIvChange = (e) => {
    setIv(e.target.value);
  };

  const hexToBytes = (hex) =>
    new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

  const handleDecryptButtonClick = async () => {
    try {
      const keyData = hexToBytes(key);
      const ivData = hexToBytes(iv);
      const encryptedData = hexToBytes(encryptedText);

      const importedKey = await window.crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: ivData,
        },
        importedKey,
        encryptedData
      );

      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decryptedBuffer);

      setDecryptedText(decryptedText);
    } catch (error) {
      console.error("Decryption Error:", error);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-lg">
      <textarea
        value={encryptedText}
        rows={4}
        onChange={handleEncryptedTextChange}
        placeholder="Enter encrypted text here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <textarea
        value={key}
        rows={4}
        onChange={handleKeyChange}
        placeholder="Enter key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <textarea
        value={iv}
        rows={4}
        onChange={handleIvChange}
        placeholder="Enter IV here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {decryptedText ? "Decrypted" : "Decrypt Text"}
      </button>
      {decryptedText && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Decrypted Text:</label>
          <textarea
            value={decryptedText}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyToClipboard(decryptedText)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy Decrypted Text"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default AESDecryptComponent;
