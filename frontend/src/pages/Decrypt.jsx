import React, { useState } from "react";
import Navbar from "../components/nav";
import AESDecryptComponent from "../components/AESDecryptComponent";
import RSADecryptComponent from "../components/RSADecryptComponent";
import DSADecryptComponent from "../components/DSADecryptComponent";
import SHADecryptComponent from "../components/SHAVerifyComponent";
import sharedClasses from "../styles/sharedClasses";

import FileAESDecryptComponent from "../components/file/FileAESDecryptComponent";
import RSAFileDecryptComponent from "../components/file/RSAFileDecryptComponent";

import AESDecryptAudio from "../components/audio/AESDecryptAudio";
import RSADecryptAudio from "../components/audio/RSADecryptAudio";

import AESDecryptImage from "../components/image/AESDecryptImage";

import VideoDecryption from "../components/video/AESDecryptVideo";
import { useActionData } from "react-router-dom";

function DecryptComponent() {
  const [decryptionType, setDecryptionType] = useState(null); // null means no decryption type selected
  const [decryptionAlgorithm, setDecryptionAlgorithm] = useState(null); // null means no specific algorithm selected

  const handleTypeSelection = (type) => {
    setDecryptionType(type);
    setDecryptionAlgorithm(null); // Reset algorithm selection when switching type
  };

  const handleAlgorithmSelection = (algorithm) => {
    setDecryptionAlgorithm(algorithm);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div
        className={`${sharedClasses.container} shadow-2xl bg-gradient-to-r from-gray-800 via-slate-900 to-gray-900 p-8 rounded-lg`}
      >
        <div className="container mx-auto max-w-4xl p-6 md:p-8 bg-gray-900 rounded-md border border-gray-700">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">
            Decryption
          </h1>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md mt-6">
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <button
                  onClick={() => handleTypeSelection("text")}
                  className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                              hover:scale-105 hover:shadow-lg transition-all duration-300
                              ${
                                decryptionType === "text"
                                  ? "border-4 border-blue-300"
                                  : ""
                              } flex items-center justify-center`}
                >
                  Text Decryption
                </button>
                <button
                  onClick={() => handleTypeSelection("file")}
                  className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                              hover:scale-105 hover:shadow-lg transition-all duration-300
                              ${
                                decryptionType === "file"
                                  ? "border-4 border-blue-300"
                                  : ""
                              } flex items-center justify-center`}
                >
                  File Decryption
                </button>
                <button
                  onClick={() => handleTypeSelection("audio")}
                  className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                              hover:scale-105 hover:shadow-lg transition-all duration-300
                              ${
                                decryptionType === "audio"
                                  ? "border-4 border-blue-300"
                                  : ""
                              } flex items-center justify-center`}
                >
                  Audio Decryption
                </button>
                <button
                  onClick={() => handleTypeSelection("image")}
                  className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                              hover:scale-105 hover:shadow-lg transition-all duration-300
                              ${
                                decryptionType === "image"
                                  ? "border-4 border-blue-300"
                                  : ""
                              } flex items-center justify-center`}
                >
                  Image Decryption
                </button>
                <button
                  onClick={() => handleTypeSelection("video")}
                  className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                              hover:scale-105 hover:shadow-lg transition-all duration-300
                              ${
                                decryptionType === "video"
                                  ? "border-4 border-blue-300"
                                  : ""
                              } flex items-center justify-center`}
                >
                  Video Decryption
                </button>
              </div>
            </div>
          </div>
          {decryptionType && (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md mt-6">
              <div className="flex items-center justify-center flex-wrap gap-4">
                {decryptionType === "text" && (
                  <>
                    <button
                      onClick={() => handleAlgorithmSelection("aes")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "aes"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      AES
                    </button>
                    <button
                      onClick={() => handleAlgorithmSelection("rsa")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "rsa"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      RSA
                    </button>
                    <button
                      onClick={() => handleAlgorithmSelection("dsa")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "dsa"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      DES
                    </button>
                    <button
                      onClick={() => handleAlgorithmSelection("sha")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "sha"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      SHA
                    </button>
                  </>
                )}
                {decryptionType === "file" && (
                  <>
                    <button
                      onClick={() => handleAlgorithmSelection("aes")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "aes"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      AES
                    </button>
                    <button
                      onClick={() => handleAlgorithmSelection("rsa")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "rsa"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      RSA
                    </button>
                  </>
                )}
                {decryptionType === "audio" && (
                  <>
                    <button
                      onClick={() => handleAlgorithmSelection("aes")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "aes"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      AES
                    </button>
                    <button
                      onClick={() => handleAlgorithmSelection("rsa")}
                      className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                  hover:scale-105 hover:shadow-lg transition-all duration-300
                                  ${
                                    decryptionAlgorithm === "rsa"
                                      ? "border-4 border-blue-300"
                                      : ""
                                  } flex items-center justify-center`}
                    >
                      RSA
                    </button>
                  </>
                )}
                {decryptionType === "image" && (
                  <button
                    onClick={() => handleAlgorithmSelection("aes")}
                    className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                hover:scale-105 hover:shadow-lg transition-all duration-300
                                ${
                                  decryptionAlgorithm === "aes"
                                    ? "border-4 border-blue-300"
                                    : ""
                                } flex items-center justify-center`}
                  >
                    AES
                  </button>
                )}
                {decryptionType === "video" && (
                  <button
                    onClick={() => handleAlgorithmSelection("aes")}
                    className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                                hover:scale-105 hover:shadow-lg transition-all duration-300
                                ${
                                  decryptionAlgorithm === "aes"
                                    ? "border-4 border-blue-300"
                                    : ""
                                } flex items-center justify-center`}
                  >
                    AES
                  </button>
                )}
              </div>
            </div>
          )}
          {decryptionType && decryptionAlgorithm && (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md mt-8">
              <div className="mt-8 flex items-center justify-center">
                {decryptionType === "text" && decryptionAlgorithm === "aes" && (
                  <AESDecryptComponent />
                )}
                {decryptionType === "text" && decryptionAlgorithm === "rsa" && (
                  <RSADecryptComponent />
                )}
                {decryptionType === "text" && decryptionAlgorithm === "dsa" && (
                  <DSADecryptComponent />
                )}
                {decryptionType === "text" && decryptionAlgorithm === "sha" && (
                  <SHADecryptComponent />
                )}
                {decryptionType === "file" && decryptionAlgorithm === "aes" && (
                  <FileAESDecryptComponent />
                )}
                {decryptionType === "file" && decryptionAlgorithm === "rsa" && (
                  <RSAFileDecryptComponent />
                )}
                {decryptionType === "audio" &&
                  decryptionAlgorithm === "aes" && <AESDecryptAudio />}
                {decryptionType === "audio" &&
                  decryptionAlgorithm === "rsa" && <RSADecryptAudio />}
                {decryptionType === "image" &&
                  decryptionAlgorithm === "aes" && <AESDecryptImage />}
                {decryptionType === "video" &&
                  decryptionAlgorithm === "aes" && <VideoDecryption />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DecryptComponent;
