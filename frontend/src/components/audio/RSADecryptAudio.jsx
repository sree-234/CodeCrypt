import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function RSADecryptToAudio() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [privateKey, setPrivateKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [decryptedStatus, setDecryptedStatus] = useState(false);

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
        const combinedBuffer = new Uint8Array(event.target.result);

        // Extract IV
        const iv = combinedBuffer.slice(0, 12);

        // Extract encrypted AES key
        const encryptedAesKey = combinedBuffer.slice(12, 268);

        // Decrypt the AES key using RSA
        const decryptedAesKey = await window.crypto.subtle.decrypt(
          {
            name: "RSA-OAEP",
          },
          importedKey,
          encryptedAesKey
        );

        // Extract encrypted file data
        const encryptedData = combinedBuffer.slice(268);

        // Import the decrypted AES key
        const aesKey = await window.crypto.subtle.importKey(
          "raw",
          decryptedAesKey,
          {
            name: "AES-GCM",
          },
          false,
          ["decrypt"]
        );

        // Decrypt the file data using AES
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: iv,
          },
          aesKey,
          encryptedData
        );

        // Convert decrypted buffer to audio/mpeg blob
        const blob = new Blob([new Uint8Array(decryptedBuffer)], {
          type: "audio/mpeg",
        });

        setDecryptedFile(blob);
        setDecryptedStatus(true);
        setTimeout(() => {
          setDecryptedStatus(false);
        }, 3000); // Reset decrypted status after 3 seconds
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
        className={`px-4 py-2 text-white rounded-md ${
          decryptedStatus ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={decryptedStatus}
      >
        {decryptedStatus ? (
          <>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Decrypted
          </>
        ) : (
          "Decrypt File to Audio"
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

export default RSADecryptToAudio;
