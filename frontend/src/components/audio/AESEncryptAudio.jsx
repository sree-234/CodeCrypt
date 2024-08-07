import React, { useState } from "react";

function AESEncryptAudio() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [aesKeyBase64, setAesKeyBase64] = useState("");
  const [encryptStatus, setEncryptStatus] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncryptButtonClick = async () => {
    if (!file) {
      alert("Please select an audio file first.");
      return;
    }

    try {
      // Generate AES key
      const aesKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Encrypt the file data using AES
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
        const encryptedBuffer = await window.crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv,
          },
          aesKey,
          arrayBuffer
        );

        // Export the AES key
        const aesKeyData = await window.crypto.subtle.exportKey("raw", aesKey);
        const aesKeyBase64 = btoa(
          String.fromCharCode.apply(null, new Uint8Array(aesKeyData))
        );

        // Combine IV and encrypted file data
        const combinedBuffer = new Uint8Array(
          iv.byteLength + encryptedBuffer.byteLength
        );
        combinedBuffer.set(iv, 0);
        combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.byteLength);

        const blob = new Blob([combinedBuffer], {
          type: "application/octet-stream",
        });
        setEncryptedFile(blob);
        setAesKeyBase64(aesKeyBase64);

        setEncryptStatus(true);
        setTimeout(() => {
          setEncryptStatus(false);
        }, 2000);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  const handleCopy = (text, setStatus) => {
    navigator.clipboard.writeText(text);
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={handleEncryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        {encryptStatus ? "Encrypted" : "Encrypt Audio File"}
        {encryptStatus && <span className="ml-2">✓</span>}
      </button>
      {encryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Encrypted Audio File:
          </label>
          <a
            href={URL.createObjectURL(encryptedFile)}
            download="encrypted_audio"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Encrypted Audio
          </a>
        </div>
      )}
      {aesKeyBase64 && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">AES Key:</label>
          <textarea
            value={aesKeyBase64}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopy(aesKeyBase64, setCopyStatus)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus ? "Copied" : "Copy AES Key"}
            {copyStatus && <span className="ml-2">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}

export default AESEncryptAudio;
