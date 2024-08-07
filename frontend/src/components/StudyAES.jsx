import React, { useState } from "react";
import CopyableInput from "../components/ci2";
import ProgressButton from "../components/ProgressButton";
import { useAuth } from "../context/AuthContext";

const StudyAES = () => {
  const { user, updateProgress } = useAuth(); // Destructure updateProgress from useAuth
  const [progress, setProgress] = useState(user?.progress?.AES || 0);
  const [currentButton, setCurrentButton] = useState(0);

  const handleUpdateProgress = async (buttonIndex) => {
    if (buttonIndex === currentButton) {
      let newProgress = progress;
      // Increment progress by 33% for each button click
      newProgress = Math.min(progress + 33, 100);
      setProgress(newProgress);
      setCurrentButton(currentButton + 1);

      // Ensure progress reaches 100% on the last button click
      if (buttonIndex === 2) {
        setProgress(100);
        setCurrentButton(3);
      }

      // Update progress in Firebase
      await updateProgress("AES", newProgress);
    }
  };

  return (
    <div>
      <div className="relative mt-4">
        <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
          <div
            className={`h-full ${
              progress === 100 ? "bg-green-500" : "bg-red-600"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="absolute top-0 right-0 p-2 bg-gray-200 rounded-md">
          <span className="text-s font-bold text-black">{progress}%</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        Introduction and Key Expansion
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Introduction</h1>
        <p>
          <strong>AES (Advanced Encryption Standard)</strong> is a symmetric
          encryption algorithm used globally to secure data.
        </p>
        <h2 className="text-l font-bold mt-2">Historical Context</h2>
        <ul className="list-disc pl-5">
          <li>
            Standardized by NIST in 2001, developed by Joan Daemen and Vincent
            Rijmen.
          </li>
        </ul>
        <h1 className="text-xl font-bold mt-2">Key Features</h1>
        <ul className="list-disc pl-5">
          <li>Symmetric key algorithm.</li>
          <li>Block cipher with 128-bit blocks.</li>
          <li>Key sizes: 128, 192, or 256 bits.</li>
        </ul>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mt-2 mb-2">Key Expansion</h1>
        <ul className="list-disc pl-5">
          <li>
            <strong>Key Schedule</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Expands the cipher key into a series of round keys.</li>
            <li>
              The number of rounds depends on the key size: 10, 12, or 14
              rounds.
            </li>
          </ul>
        </ul>
        <h1 className="text-xl font-bold mt-2 mb-2">Steps for 128-bit Key</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Initial Key</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: `2b7e151628aed2a6abf7158809cf4f3c`.</li>
          </ul>
          <li>
            <strong>Key Expansion Process</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Generate an array of words (32-bit each) from the initial key.
            </li>
            <li>
              Perform transformations on the initial key to produce round keys.
            </li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Key Expansion
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: 128-bit key.</li>
          <li>Output: Expanded key schedule.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`from Crypto.Cipher import AES\nimport binascii\n\ndef expand_key_128bit(key):\n    key_bytes = binascii.unhexlify(key)\n    cipher = AES.new(key_bytes, AES.MODE_ECB)\n    expanded_key = cipher.expand_key(key_bytes)\n    return binascii.hexlify(expanded_key)\n\nkey = "2b7e151628aed2a6abf7158809cf4f3c"\nexpanded_key = expand_key_128bit(key)\nprint("Expanded Key:", expanded_key)`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(0)}
          progress={progress}
          isCompleted={progress >= 33}
          disabled={currentButton !== 0}
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-2">
        Encryption and Decryption
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Encryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Divide plaintext into 128-bit blocks.</strong>
          </li>
          <li>
            <strong>Initial AddRoundKey step.</strong>
          </li>
          <li>
            <strong>For each round:</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>SubBytes</li>
            <li>ShiftRows</li>
            <li>MixColumns (except final round)</li>
            <li>AddRoundKey</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Initial AddRoundKey step.</strong>
          </li>
          <li>
            <strong>For each round (in reverse):</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>InvShiftRows</li>
            <li>InvSubBytes</li>
            <li>AddRoundKey</li>
            <li>InvMixColumns (except final round)</li>
          </ul>
        </ol>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-2xl font-bold mb-2">Example</h1>
        <ul className="list-disc pl-5">
          <li>Key: `2b7e151628aed2a6abf7158809cf4f3c` (128-bit)</li>
          <li>Plaintext: `3243f6a8885a308d313198a2e0370734`</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">Encryption:</h1>
        <ul className="list-disc pl-5">
          <li>Initial AddRoundKey and 10 rounds of transformations.</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1>
        <ul className="list-disc pl-5">
          <li>Inverse of the encryption process.</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">
          Interactive Section: Encryption/Decryption
        </h1>
        <ul className="list-disc pl-5">
          <li>
            Input: Plaintext and Public Key for encryption; Ciphertext and Key
            for decryption.
          </li>
          <li>Output: Ciphertext for encryption; Plaintext for decryption.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`from Crypto.Cipher import AES\n\ndef aes_encrypt(plaintext, key):\n    cipher = AES.new(binascii.unhexlify(key), AES.MODE_ECB)\n    ciphertext = cipher.encrypt(binascii.unhexlify(plaintext))\n    return binascii.hexlify(ciphertext)\n\ndef aes_decrypt(ciphertext, key):\n    cipher = AES.new(binascii.unhexlify(key), AES.MODE_ECB)\n    decrypted_text = cipher.decrypt(binascii.unhexlify(ciphertext))\n    return binascii.hexlify(decrypted_text)\n\nkey = "2b7e151628aed2a6abf7158809cf4f3c"\nplaintext = "3243f6a8885a308d313198a2e0370734"\nciphertext = aes_encrypt(plaintext, key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = aes_decrypt(ciphertext, key)\nprint("Decrypted Text:", decrypted_text)`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(1)}
          progress={progress}
          isCompleted={progress >= 66}
          disabled={currentButton !== 1}
        />
      </div>
      <h2 className="text-3xl font-bold mb-2 mt-2">Related YouTube Videos</h2>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <div className="mt-2">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4">
              <a
                href={`https://www.youtube.com/watch?v=3MPkc-PFSRI`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/3MPkc-PFSRI/hqdefault.jpg`}
                  alt="Introduction to Advanced Encryption Standard (AES)"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  Introduction to Advanced Encryption Standard (AES)
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=Z_7aOkS8tOA`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/Z_7aOkS8tOA/hqdefault.jpg`}
                  alt="AES - Advanced Encryption Standard Algorithm In Cryptography | AES Explained | Simplilearn"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  AES - Advanced Encryption Standard Algorithm In Cryptography |
                  AES Explained | Simplilearn
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=mX625uCU1bc`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/mX625uCU1bc/hqdefault.jpg`}
                  alt="Advanced Encryption Standard (AES) Algorithm - Block Cipher Algorithm |CNS|"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  Advanced Encryption Standard (AES) Algorithm - Block Cipher
                  Algorithm |CNS|
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(2)}
          progress={progress}
          isCompleted={progress === 100}
          disabled={currentButton !== 2}
        />
      </div>
    </div>
  );
};

export default StudyAES;
