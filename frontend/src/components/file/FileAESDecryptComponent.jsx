import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [decryptStatus, setDecryptStatus] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleIvChange = (e) => {
    setIv(e.target.value);
  };

  const decryptFile = async () => {
    if (!file) {
      alert("Please select an encrypted file to decrypt.");
      return;
    }

    try {
      const keyBuffer = new Uint8Array(
        key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const ivBuffer = new Uint8Array(
        iv.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const encryptedFileArrayBuffer = await file.arrayBuffer();

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      setDecryptStatus(true);

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: ivBuffer,
        },
        cryptoKey,
        encryptedFileArrayBuffer
      );

      const decryptedBlob = new Blob([decryptedBuffer]);
      setDecryptedFile(URL.createObjectURL(decryptedBlob));

      setTimeout(() => {
        setDecryptStatus(false);
      }, 2000); // Revert decrypt status after 2 seconds
    } catch (error) {
      console.error("Decryption Error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <label className="block font-semibold mb-2">Key:</label>
      <input
        type="text"
        value={key}
        onChange={handleKeyChange}
        placeholder="Enter key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <label className="block font-semibold mb-2">IV:</label>
      <input
        type="text"
        value={iv}
        onChange={handleIvChange}
        placeholder="Enter IV here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />

      <button
        onClick={decryptFile}
        className="px-4 py-2 bg-blue-500  text-white rounded-md hover:bg-blue-600 relative"
      >
        {decryptStatus ? "Decrypted" : "Decrypt File"}
      </button>

      {decryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Encrypted File:</label>
          <a
            href={decryptedFile}
            download="decrypted-file"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Decrypted File
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
