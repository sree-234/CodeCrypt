import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function RSAComponent() {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [copyStatus, setCopyStatus] = useState({
    text: false,
    publicKey: false,
    privateKey: false,
  });
  const [encryptStatus, setEncryptStatus] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = async () => {
    try {
      // Generate RSA key pair
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
      );

      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      // Encrypt the data
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        keyPair.publicKey,
        data
      );

      const encryptedArray = new Uint8Array(encryptedBuffer);
      const encryptedHex = Array.prototype.map
        .call(encryptedArray, (x) => ("00" + x.toString(16)).slice(-2))
        .join("");

      // Export the public key
      const publicKeyData = await window.crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey
      );
      const publicKeyBase64 = btoa(
        String.fromCharCode.apply(null, new Uint8Array(publicKeyData))
      );

      // Export the private key
      const privateKeyData = await window.crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey
      );
      const privateKeyBase64 = btoa(
        String.fromCharCode.apply(null, new Uint8Array(privateKeyData))
      );

      setEncryptedText(encryptedHex);
      setPublicKey(publicKeyBase64);
      setPrivateKey(privateKeyBase64);

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
      {publicKey && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Public Key:</label>
          <textarea
            value={publicKey}
            readOnly
            rows={10}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyClick("publicKey", publicKey)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus.publicKey ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy Public Key"
            )}
          </button>
        </div>
      )}
      {privateKey && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Private Key:</label>
          <textarea
            value={privateKey}
            readOnly
            rows={10}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyClick("privateKey", privateKey)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyStatus.privateKey ? (
              <>
                <span className="mr-2">Copied</span>
                <i className="fas fa-check"></i>
              </>
            ) : (
              "Copy Private Key"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default RSAComponent;
