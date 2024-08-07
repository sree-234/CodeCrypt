import React, { useState } from "react";
import CopyableInput from "../components/ci2";
import ProgressButton from "../components/ProgressButton";
import { useAuth } from "../context/AuthContext";

const StudyDES = () => {
  const { user, updateProgress } = useAuth(); // Destructure updateProgress from useAuth
  const [progress, setProgress] = useState(user?.progress?.DES || 0);
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
      await updateProgress("DES", newProgress);
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
        Introduction and Key Generation
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Introduction</h1>
        <p>
          <strong>DES (Data Encryption Standard)</strong> is a symmetric-key
          algorithm for the encryption of electronic data.
        </p>
        <h2 className="text-l font-bold mt-2">Historical Context</h2>
        <ul className="list-disc pl-5">
          <li>
            Developed in the early 1970s by IBM and standardized by NIST in
            1977.
          </li>
        </ul>
        <h1 className="text-xl font-bold mt-2">Key Features</h1>
        <ul className="list-disc pl-5">
          <li>64-bit block size.</li>
          <li>56-bit key (input as 64 bits with parity bits).</li>
        </ul>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mt-2 mb-2">Key Generation Steps</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Input 64-bit key (56 bits + 8 parity bits).</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: `133457799BBCDFF1`.</li>
          </ul>
          <li>
            <strong>Permute and divide the key into two halves.</strong>
          </li>
          <li>
            <strong>
              Generate 16 subkeys using left shifts and permuted choice
              functions.
            </strong>
          </li>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Key Generation
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: 64-bit key.</li>
          <li>Output: 16 subkeys.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`from Crypto.Cipher import DES\n\ndef generate_des_subkeys(key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    subkeys = des.key_schedule()\n    return [binascii.hexlify(k) for k in subkeys]\n\nkey = "133457799BBCDFF1"\nsubkeys = generate_des_subkeys(key)\nprint("Subkeys:", subkeys)`}
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
            <strong>Divide plaintext into 64-bit blocks.</strong>
          </li>
          <li>
            <strong>Initial Permutation (IP).</strong>
          </li>
          <li>
            <strong>16 rounds of Feistel structure:</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Expansion, key mixing, substitution, and permutation.</li>
          </ul>
          <li>
            <strong>Final Permutation (FP).</strong>
          </li>
        </ol>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Initial Permutation (IP).</strong>
          </li>
          <li>
            <strong>16 rounds of Feistel structure (in reverse order).</strong>
          </li>
          <li>
            <strong>Final Permutation (FP).</strong>
          </li>
        </ol>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-2xl font-bold mb-2">Example</h1>
        <ul className="list-disc pl-5">
          <li>Key: `133457799BBCDFF1`</li>
          <li>Plaintext: `0123456789ABCDEF`</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">Encryption:</h1>
        <ul className="list-disc pl-5">
          <li>Initial permutation and 16 rounds of transformation.</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1>
        <ul className="list-disc pl-5">
          <li>Reverse the encryption rounds.</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">
          Interactive Section: Encryption/Decryption
        </h1>
        <ul className="list-disc pl-5">
          <li>
            Input: Plaintext and Key for encryption; Ciphertext and Key for
            decryption.
          </li>
          <li>Output: Ciphertext for encryption; Plaintext for decryption.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`def des_encrypt(plaintext, key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    ciphertext = des.encrypt(binascii.unhexlify(plaintext))\n    return binascii.hexlify(ciphertext)\n\ndef des_decrypt(ciphertext, key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    decrypted_text = des.decrypt(binascii.unhexlify(ciphertext))\n    return binascii.hexlify(decrypted_text)\n\nkey = "133457799BBCDFF1"\nplaintext = "0123456789ABCDEF"\nciphertext = des_encrypt(plaintext, key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = des_decrypt(ciphertext, key)\nprint("Decrypted Text:", decrypted_text)`}
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
                href={`https://www.youtube.com/watch?v=j53iXhTSi_s`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/j53iXhTSi_s/hqdefault.jpg`}
                  alt="Introduction to Data Encryption Standard (DES)"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  Introduction to Data Encryption Standard (DES)
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=jTyiIHC51_w`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/jTyiIHC51_w/hqdefault.jpg`}
                  alt="Data Encryption Standard ( DES ) Algorithm |CNS|"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  Data Encryption Standard ( DES ) Algorithm |CNS|
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=S918rR4VdqQ`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/S918rR4VdqQ/hqdefault.jpg`}
                  alt="DES - Data Encryption Standard | Data Encryption Standard In Cryptography |DES Algorithm|Simplilearn"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  DES - Data Encryption Standard | Data Encryption Standard In
                  Cryptography |DES Algorithm|Simplilearn
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

export default StudyDES;
