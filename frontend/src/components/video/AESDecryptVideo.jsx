import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AESDecryptVideo() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [aesKeyBase64, setAesKeyBase64] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [decrypting, setDecrypting] = useState(false);
  const [decrypted, setDecrypted] = useState(false);

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
      alert("Please select an encrypted video file first.");
      return;
    }

    setDecrypting(true);
    setDecrypted(false);

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

        const blob = new Blob([new Uint8Array(decryptedBuffer)], {
          type: "video/mp4",
        });
        setDecryptedFile(blob);
        setDecrypted(true);
        setTimeout(() => {
          setDecrypting(false);
          setDecrypted(false);
        }, 3000);
      };

      fileReader.readAsArrayBuffer(encryptedFile);
    } catch (error) {
      console.error("Decryption Error:", error);
      setDecrypting(false);
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
        className={`px-4 py-2 rounded-md text-white ${
          decrypting
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        } flex items-center justify-center`}
        disabled={decrypting}
      >
        {decrypting ? (
          <>
            Decrypted
            <FontAwesomeIcon icon={faCheck} className="ml-2" />
          </>
        ) : (
          "Decrypt Video File"
        )}
      </button>
      {decryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Decrypted Video File:
          </label>
          <a
            href={URL.createObjectURL(decryptedFile)}
            download="decrypted_video"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Decrypted Video
          </a>
        </div>
      )}
    </div>
  );
}

export default AESDecryptVideo;
