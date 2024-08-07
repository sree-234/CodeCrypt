import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function RSAComponent() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [encryptStatus, setEncryptStatus] = useState(false);
  const [copyPublicKeyStatus, setCopyPublicKeyStatus] = useState(false);
  const [copyPrivateKeyStatus, setCopyPrivateKeyStatus] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncryptButtonClick = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

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

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Encrypt the file data
        const encryptedBuffer = await window.crypto.subtle.encrypt(
          {
            name: "RSA-OAEP",
          },
          keyPair.publicKey,
          arrayBuffer
        );

        const blob = new Blob([new Uint8Array(encryptedBuffer)], {
          type: "application/octet-stream",
        });
        setEncryptedFile(blob);

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

        setPublicKey(publicKeyBase64);
        setPrivateKey(privateKeyBase64);

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
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={handleEncryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {encryptStatus ? "Encrypted" : "Encrypt File"}
      </button>
      {encryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Encrypted File:</label>
          <a
            href={URL.createObjectURL(encryptedFile)}
            download="encrypted_file"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Encrypted File
          </a>
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
            onClick={() => handleCopy(publicKey, setCopyPublicKeyStatus)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyPublicKeyStatus ? (
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
            onClick={() => handleCopy(privateKey, setCopyPrivateKeyStatus)}
            className="relative px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            {copyPrivateKeyStatus ? (
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
