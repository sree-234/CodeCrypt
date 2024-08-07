import React, { useState } from "react";
import CopyableInput from "../components/ci2";
import ProgressButton from "../components/ProgressButton";
import { useAuth } from "../context/AuthContext";

const StudySHA = () => {
  const { user, updateProgress } = useAuth(); // Destructure updateProgress from useAuth
  const [progress, setProgress] = useState(user?.progress?.SHA || 0);
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
      await updateProgress("SHA", newProgress);
    }
  };

  return (
    <>
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
        Introduction and Message Preparation
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Introduction</h1>
        <p>
          <strong>SHA (Secure Hash Algorithm)</strong> is a family of
          cryptographic hash functions designed to provide data integrity.
        </p>
        <h2 className="text-l font-bold mt-2">Historical Context</h2>
        <ul className="list-disc pl-5">
          <li>
            Developed by the National Security Agency (NSA) and published by
            NIST.
          </li>
        </ul>
        <h1 className="text-xl font-bold mt-2">Key Features</h1>
        <ul className="list-disc pl-5">
          <li>Produces a fixed-size hash value from input data.</li>
          <li>Commonly used versions: SHA-1, SHA-256, SHA-512.</li>
        </ul>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mt-2 mb-2">Message Preparation</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Padding</strong>
            <ul className="list-disc pl-5">
              <li>
                Pad the message to make its length congruent to 448 modulo 512.
              </li>
              <li>Append the original message length as a 64-bit number.</li>
            </ul>
          </li>
          <li>
            <strong>Divide message into 512-bit blocks.</strong>
          </li>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Message Preparation
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: Message.</li>
          <li>Output: Padded and divided message.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`import hashlib\n\ndef prepare_message(message):\n    original_length = len(message) * 8\n    message += b'\\x80'\n    while (len(message) * 8) % 512 != 448:\n        message += b'\\x00'\n    message += original_length.to_bytes(8, byteorder='big')\n    return message\n\nmessage = b"hello"\nprepared_message = prepare_message(message)\nprint("Prepared Message:", prepared_message)`}
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
      <h1 className="text-3xl font-bold mb-2 mt-2">Hash Computation</h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Hash Computation Steps</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Initialize Hash Values</strong>
            <ul className="list-disc pl-5">
              <li>
                Use initial hash values specific to the SHA variant (e.g.,
                SHA-256).
              </li>
            </ul>
          </li>
          <li>
            <strong>Process Each 512-bit Block</strong>
            <ul className="list-disc pl-5">
              <li>Divide block into 16 words (32 bits each).</li>
              <li>Extend the 16 words into 64 words (for SHA-256).</li>
              <li>Initialize working variables (a, b, c, d, e, f, g, h).</li>
              <li>Perform 64 rounds of the compression function.</li>
            </ul>
          </li>
        </ol>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-2xl font-bold mb-2">Example</h1>
        <ul className="list-disc pl-5">
          <li>
            <strong>Initial Hash Values</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Eight 32-bit words.</li>
          </ul>
          <li>
            <strong>Message Schedule Array</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>64 words derived from the 512-bit input block.</li>
          </ul>
          <li>
            <strong>Compression Function</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Update hash values with bitwise operations and modular additions.
            </li>
          </ul>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">
          Interactive Section: Hash Computation
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: Prepared message.</li>
          <li>Output: Hash value.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`def compute_sha256(message):\n    sha256 = hashlib.sha256()\n    sha256.update(message)\n    return sha256.hexdigest()\n\nmessage = prepare_message(b"hello")\nhash_value = compute_sha256(message)\nprint("SHA-256 Hash:", hash_value)`}
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
                href={`https://www.youtube.com/watch?v=YBZRHb1o8x0`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/YBZRHb1o8x0/hqdefault.jpg`}
                  alt="SHA ( Secure Hash Algorithm )Algorithm with example |CNS|"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  SHA ( Secure Hash Algorithm )Algorithm with example |CNS|
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=nduoUEHrK_4`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/nduoUEHrK_4/hqdefault.jpg`}
                  alt="SHA 256 | SHA 256 Algorithm Explanation | How SHA 256 Algorithm Works | Cryptography | Simplilearn"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  SHA 256 | SHA 256 Algorithm Explanation | How SHA 256
                  Algorithm Works | Cryptography | Simplilearn
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=Qvk9Bptdh_U`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/Qvk9Bptdh_U/hqdefault.jpg`}
                  alt="SHA 1 | Secure Hash Algorithm | Working of SHA 1 | Parameters of SHA512 and SHA 256"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  SHA 1 | Secure Hash Algorithm | Working of SHA 1 | Parameters
                  of SHA512 and SHA 256
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
    </>
  );
};

export default StudySHA;
