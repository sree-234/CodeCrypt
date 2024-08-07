import React, { useState } from "react";

function RSADecryptComponent() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [privateKey, setPrivateKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [decryptStatus, setDecryptStatus] = useState(false);

  const handleFileChange = (e) => {
    setEncryptedFile(e.target.files[0]);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handleDecryptButtonClick = async () => {
    if (!encryptedFile) {
      alert("Please select an encrypted file first.");
      return;
    }

    try {
      const privateKeyData = base64ToArrayBuffer(privateKey);

      const importedKey = await window.crypto.subtle.importKey(
        "pkcs8",
        privateKeyData,
        {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" },
        },
        false,
        ["decrypt"]
      );

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const encryptedBuffer = event.target.result;

        setDecryptStatus(true);

        const decryptedBuffer = await window.crypto.subtle.decrypt(
          {
            name: "RSA-OAEP",
          },
          importedKey,
          encryptedBuffer
        );

        const blob = new Blob([new Uint8Array(decryptedBuffer)], {
          type: "application/octet-stream",
        });
        setDecryptedFile(blob);

        setTimeout(() => {
          setDecryptStatus(false);
        }, 2000); // Revert decrypt status after 2 seconds
      };

      fileReader.readAsArrayBuffer(encryptedFile);
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
      <textarea
        value={privateKey}
        rows={10}
        onChange={handlePrivateKeyChange}
        placeholder="Enter private key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 relative"
      >
        {decryptStatus ? "Decrypted" : "Decrypt File"}
      </button>
      {decryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Decrypted File:</label>
          <a
            href={URL.createObjectURL(decryptedFile)}
            download="decrypted_file"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Decrypted File
          </a>
        </div>
      )}
    </div>
  );
}

export default RSADecryptComponent;
