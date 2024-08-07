import React, { useState } from "react";
import CopyableInput from "../components/ci2";
import ProgressButton from "../components/ProgressButton";
import { useAuth } from "../context/AuthContext";

const StudyRSA = () => {
  const { user, updateProgress } = useAuth(); // Destructure updateProgress from useAuth
  const [progress, setProgress] = useState(user?.progress?.RSA || 0);
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
      await updateProgress("RSA", newProgress);
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
          <strong>RSA (Rivest–Shamir–Adleman)</strong> is an asymmetric
          cryptographic algorithm used for secure data transmission. It uses a
          pair of keys: a public key for encryption and a private key for
          decryption.
        </p>
        <h2 className="text-l font-bold mt-2">Historical Context</h2>
        <ul className="list-disc pl-5">
          <li>
            Introduced in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman.
          </li>
          <li>Widely used in digital signatures and key exchanges</li>
        </ul>
        <h1 className="text-xl font-bold mt-2">Mathematical Background</h1>
        <ul className="list-disc pl-5">
          <li className="text-l font-bold mt-2">Prime Numbers and Factoring</li>
          <ul className="list-disc pl-5">
            <li>
              The security of RSA relies on the difficulty of factoring large
              composite numbers.
            </li>
          </ul>
          <li className="text-l font-bold mt-2">Euler’s Totient Function</li>
          <ul className="list-disc pl-5">
            <li>ϕ(n)=(p−1)(q−1) where 𝑝 and q are prime numbers.</li>
          </ul>
        </ul>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mt-2 mb-2">Key Generation Steps</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Select two large prime numbers 𝑝 and 𝑞.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: p=61,q=53.</li>
          </ul>
          <li>
            <strong>Compute n = p x q.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: n=61×53=3233.</li>
          </ul>
          <li>
            <strong>Compute Euler’s totient function ϕ(n)=(p−1)(q−1).</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: ϕ(n)=(61−1)(53−1)=3120.</li>
          </ul>
          <li>
            <strong>
              Choose an integer e such that 1‹e‹ϕ(n) and gcd(e,ϕ(n))=1.
            </strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: e=17.</li>
          </ul>
          <li>
            <strong>Compute d such that d×e≡1modϕ(n).</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: d=2753 (found using Extended Euclidean Algorithm).</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">Key Pairs</h1>
        <ul className="list-disc pl-5">
          <li>Public Key: (e,n) = (17, 3233)</li>
          <li>Private Key: (d,n) = (2753, 3233)</li>
        </ul>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Key Generation
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: Two prime numbers p and q.</li>
          <li>Output: n,ϕ(n),e,d, Public Key, Private Key.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`import sympy\n\ndef generate_rsa_keys(p, q):\n    n = p * q\n    phi = (p - 1) * (q - 1)\n    e = sympy.randprime(1, phi)\n    d = pow(e, -1, phi)\n    return (e, n), (d, n)\n\np = 61\nq = 53\npublic_key, private_key = generate_rsa_keys(p, q)\nprint("Public Key:", public_key)\nprint("Private Key:", private_key)`}
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
            <strong>Convert plaintext message to an integer 0≤m‹n.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: Plaintext "HI" converted to numeric m=72.</li>
          </ul>
          <li>
            <strong>Compute the ciphertext c using c=m^e modn.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: c=72^17 mod 3233=3000.</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Compute the original message m using m=c^d mod n.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: m=3000^2753 mod 3233 = 72.</li>
          </ul>
        </ol>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-2xl font-bold mb-2">Example</h1>
        <ul className="list-disc pl-5">
          <li>Plaintext: "HI" (convert to numeric: 72)</li>
          <li>Public Key: (17, 3233)</li>
          <li>Private Key: (2753, 3233)</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">Encryption:</h1>
        <ul className="list-disc pl-5">
          <li>m = 72</li>
          <li>c = 72^17 mod 3233 = 3000</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1>
        <ul className="list-disc pl-5">
          <li>m = 3000^2753 mod 3233 = 72</li>
          <li>Convert back to text: "HI"</li>
        </ul>
        <h1 className="text-xl font-bold mb-2 mt-2">
          Interactive Section: Encryption/Decryption
        </h1>
        <ul className="list-disc pl-5">
          <li>
            Input: Plaintext and Public Key for encryption; Ciphertext and
            Private Key for decryption.
          </li>
          <li>Output: Ciphertext for encryption; Plaintext for decryption.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`def rsa_encrypt(plaintext, public_key):\n    e, n = public_key\n    plaintext_int = [ord(char) for char in plaintext]\n    ciphertext = [pow(m, e, n) for m in plaintext_int]\n    return ciphertext\n\ndef rsa_decrypt(ciphertext, private_key):\n    d, n = private_key\n    decrypted_int = [pow(c, d, n) for c in ciphertext]\n    decrypted_text = ''.join([chr(m) for m in decrypted_int])\n    return decrypted_text\n\npublic_key = (17, 3233)\nprivate_key = (2753, 3233)\nplaintext = "HI"\nciphertext = rsa_encrypt(plaintext, public_key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = rsa_decrypt(ciphertext, private_key)\nprint("Decrypted Text:", decrypted_text)`}
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
                href={`https://www.youtube.com/watch?v=JFQAHDOHjfM`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/JFQAHDOHjfM/hqdefault.jpg`}
                  alt="RSA Algorithm - Asymmetric key cryptography |CNS|"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  RSA Algorithm - Asymmetric key cryptography |CNS|
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=vf1z7GlG6Qo`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/vf1z7GlG6Qo/maxresdefault.jpg`}
                  alt="RSA Encryption Algorithm | Rivest–Shamir–Adleman | RSA Algorithm Explained | Simplilearn"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  RSA Encryption Algorithm | Rivest–Shamir–Adleman | RSA
                  Algorithm Explained | Simplilearn
                </p>
              </a>
              <a
                href={`https://www.youtube.com/watch?v=qph77bTKJTM`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none" }}
              >
                <img
                  src={`https://i.ytimg.com/vi/qph77bTKJTM/maxresdefault.jpg`}
                  alt="How does RSA Cryptography work?"
                  style={{
                    width: "90%",
                    height: "80%",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  How does RSA Cryptography work?
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

export default StudyRSA;
