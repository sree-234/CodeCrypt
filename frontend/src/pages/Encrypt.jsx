import React, { useState } from "react";
import Navbar from "../components/nav";
import AESComponent from "../components/AESComponent";
import RSAComponent from "../components/RSAComponent";
import DSAEncryptComponent from "../components/DSAEncryptComponent";
import SHAComponent from "../components/SHAComponent";
import sharedClasses from "../styles/sharedClasses";

import FileAESComponent from "../components/file/FileAESComponent";
import RSAFileEncryptComponent from "../components/file/RSAFileEncryptComponent";
import AESEncryptAudio from "../components/audio/AESEncryptAudio";
import RSAEncryptAudio from "../components/audio/RSAEncryptAudio";
import AESEncryptImage from "../components/image/AESEncryptImage";
import VideoEncryption from "../components/video/AESEncryptVideo";

function EncryptComponent() {
  const [encryptionType, setEncryptionType] = useState(null); // null means neither text nor file encryption selected
  const [encryptionAlgorithm, setEncryptionAlgorithm] = useState(null); // null means no specific algorithm selected

  const handleTypeSelection = (type) => {
    setEncryptionType(type);
    setEncryptionAlgorithm(null); // Reset algorithm selection when switching type
  };

  const handleAlgorithmSelection = (algorithm) => {
    setEncryptionAlgorithm(algorithm);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white ">
      <Navbar />
      <div className={`${sharedClasses.container} shadow-2xl bg-gradient-to-r from-gray-800 via-slate-900 to-gray-900 p-8 rounded-lg`}>
        <div className="container mx-auto max-w-4xl p-6 md:p-8 bg-gray-900 rounded-md border border-gray-700">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">
            Encryption
          </h1>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md mt-6">
            <div className="flex items-center justify-center"> 
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <button
                onClick={() => handleTypeSelection("text")}
                className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionType === "text" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
              >
              Text Encryption
            </button>
            <button
                onClick={() => handleTypeSelection("file")}
                className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionType === "file" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
              >
              File Encryption
            </button>
            <button
                onClick={() => handleTypeSelection("audio")}
                className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionType === "audio" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
              >
              Audio Encryption
            </button>
            <button
                onClick={() => handleTypeSelection("image")}
                className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionType === "image" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
              >
              Image Encryption
            </button>
            <button
                onClick={() => handleTypeSelection("video")}
                className={`px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionType === "video" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
              >
              Video Encryption
            </button>
              </div>
            </div>
          </div>
          {encryptionType && (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md mt-6">
              <div className="flex items-center justify-center flex-wrap gap-4">  
              {encryptionType === "text" && (
                <>
                  <button
                onClick={() => handleAlgorithmSelection("aes")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "aes" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    AES
                  </button>
                  <button
                onClick={() => handleAlgorithmSelection("rsa")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "rsa" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    RSA
                  </button>
                  <button
                onClick={() => handleAlgorithmSelection("dsa")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "dsa" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    DES
                  </button>
                  <button
                onClick={() => handleAlgorithmSelection("sha")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "sha" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    SHA
                  </button>
                </>
              )}
              {encryptionType === "file" && (
                <>
                  <button
                onClick={() => handleAlgorithmSelection("aes")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "aes" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    AES
                  </button>
                  <button
                onClick={() => handleAlgorithmSelection("rsa")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "rsa" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    RSA
                  </button>
                  {/* Add more file encryption algorithms if needed */}
                </>
              )}
              {encryptionType === "audio" && (
                <>
                  <button
                onClick={() => handleAlgorithmSelection("aes")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "aes" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    AES
                  </button>
                  <button
                onClick={() => handleAlgorithmSelection("rsa")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "rsa" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    RSA
                  </button>
                  {/* Add more audio encryption algorithms if needed */}
                </>
              )}
              {encryptionType === "image" && (
                <>
                  <button
                onClick={() => handleAlgorithmSelection("aes")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "aes" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    AES
                  </button>
                </>
              )}
              {encryptionType === "video" && (
                <>
                  <button
                onClick={() => handleAlgorithmSelection("aes")}
                className={`px-8 py-4 text-l font-bold text-white bg-gradient-to-r from-blue-gray-700 to-teal-800 rounded-md shadow-md
                            hover:scale-105 hover:shadow-lg transition-all duration-300
                            ${encryptionAlgorithm === "aes" ? "border-4 border-blue-300" : ""} flex items-center justify-center`}
                  >
                    AES
                  </button>
                </>
              )}
                </div>
              </div>
          )}
          {encryptionType && encryptionAlgorithm && (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md mt-8">
              <div className="mt-8 flex items-center justify-center"> 
              {encryptionType === "text" && encryptionAlgorithm === "aes" && (
                <AESComponent />
              )}
              {encryptionType === "text" && encryptionAlgorithm === "rsa" && (
                <RSAComponent />
              )}
              {encryptionType === "text" && encryptionAlgorithm === "dsa" && (
                <DSAEncryptComponent />
              )}
              {encryptionType === "text" && encryptionAlgorithm === "sha" && (
                <SHAComponent />
              )}
              {encryptionType === "file" && encryptionAlgorithm === "aes" && (
                <FileAESComponent />
              )}
              {encryptionType === "file" && encryptionAlgorithm === "rsa" && (
                <RSAFileEncryptComponent />
              )}
              {encryptionType === "audio" && encryptionAlgorithm === "aes" && (
                <AESEncryptAudio />
              )}
              {encryptionType === "audio" && encryptionAlgorithm === "rsa" && (
                <RSAEncryptAudio />
              )}
              {encryptionType === "image" && encryptionAlgorithm === "aes" && (
                <AESEncryptImage />
              )}
              {encryptionType === "video" && encryptionAlgorithm === "aes" && (
                <VideoEncryption />
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EncryptComponent;
