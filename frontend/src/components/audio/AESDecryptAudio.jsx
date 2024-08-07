import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AESDecryptToAudio() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [aesKeyBase64, setAesKeyBase64] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [decryptStatus, setDecryptStatus] = useState(false);

  const handleFileChange = (e) => {
    setEncryptedFile(e.target.files[0]);
  };

  const handleAesKeyChange = (e) => {
    setAesKeyBase64(e.target.value);
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
      const aesKeyData = base64ToArrayBuffer(aesKeyBase64);

      const importedKey = await window.crypto.subtle.importKey(
        "raw",
        aesKeyData,
        {
          name: "AES-GCM",
        },
        false,
        ["decrypt"]
      );

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const combinedBuffer = new Uint8Array(event.target.result);

        // Extract IV
        const iv = combinedBuffer.slice(0, 12);

        // Extract encrypted file data
        const encryptedData = combinedBuffer.slice(12);

        // Decrypt the file data using AES
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: iv,
          },
          importedKey,
          encryptedData
        );

        // Convert decrypted buffer to audio/mpeg blob
        const blob = new Blob([new Uint8Array(decryptedBuffer)], {
          type: "audio/mpeg",
        });

        setDecryptedFile(blob);
        setDecryptStatus(true);

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
        value={aesKeyBase64}
        rows={4}
        onChange={handleAesKeyChange}
        placeholder="Enter AES key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 relative"
      >
        {decryptStatus ? (
          <>
            Decrypted <FontAwesomeIcon icon={faCheck} className="ml-2" />
          </>
        ) : (
          "Decrypt File"
        )}
      </button>
      {decryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Decrypted Audio File:
          </label>
          <a
            href={URL.createObjectURL(decryptedFile)}
            download="decrypted_audio"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Decrypted Audio
          </a>
        </div>
      )}
    </div>
  );
}

export default AESDecryptToAudio;
