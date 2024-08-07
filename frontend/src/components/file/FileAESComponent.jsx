import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [encryptStatus, setEncryptStatus] = useState(false);
  const [copyKeyStatus, setCopyKeyStatus] = useState(false);
  const [copyIvStatus, setCopyIvStatus] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const encryptFile = async () => {
    if (!file) {
      alert("Please select a file to encrypt.");
      return;
    }

    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-CBC",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(16));
      const fileArrayBuffer = await file.arrayBuffer();

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv: iv,
        },
        key,
        fileArrayBuffer
      );

      const encryptedBlob = new Blob([encryptedBuffer]);

      const keyData = await window.crypto.subtle.exportKey("raw", key);
      const keyHex = Array.from(new Uint8Array(keyData), (x) =>
        ("00" + x.toString(16)).slice(-2)
      ).join("");

      setEncryptedFile(URL.createObjectURL(encryptedBlob));
      setKey(keyHex);
      setIv(Array.from(iv, (x) => ("00" + x.toString(16)).slice(-2)).join(""));

      setEncryptStatus(true);
      setTimeout(() => {
        setEncryptStatus(false);
      }, 2000);
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
    <div className="w-full max-w-lg mx-auto mt-10">
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={encryptFile}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        {encryptStatus ? (
          <>
            <span className="mr-2">Encrypted</span>
            <i className="fas fa-check"></i>{" "}
            {/* Replace with appropriate audioaes icon class */}
          </>
        ) : (
          "Encrypt File"
        )}
      </button>
      {encryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Encrypted File:</label>
          <a
            href={encryptedFile}
            download="encrypted_file"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Encrypted File
          </a>
        </div>
      )}

      {key && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Key:</label>
          <textarea
            value={key}
            readOnly
            rows={2}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopy(key, setCopyKeyStatus)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyKeyStatus ? (
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
            rows={2}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopy(iv, setCopyIvStatus)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyIvStatus ? (
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

export default App;
