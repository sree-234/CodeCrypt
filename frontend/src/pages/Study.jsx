import React, { useState, useEffect } from "react";
import Navbar from "../components/nav";
import AlgorithmCard from "../components/ac2";
import sharedClasses from "../styles/sharedClasses";

import StudyRSA from "../components/StudyRSA";
import StudyAES from "../components/StudyAES";
import StudyDES from "../components/StudyDES";
import StudySHA from "../components/StudySHA";
import { useAuth } from "../context/AuthContext";

const Study = () => {
  const { user, updateCompletedAlgorithms } = useAuth();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [completedAlgorithms, setCompletedAlgorithms] = useState([]);

  const algorithmDescriptions = {
    RSA: "Click to view RSA details and steps.",
    AES: "Click to view AES details and steps.",
    DES: "Click to view DES details and steps.",
    SHA: "Click to view SHA details and steps.",
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleCompletion = (algorithm) => {
    if (user && !completedAlgorithms.includes(algorithm)) {
      updateCompletedAlgorithms(algorithm);
      setCompletedAlgorithms([...completedAlgorithms, algorithm]);
    }
  };

  useEffect(() => {
    if (user && user.completedAlgorithms) {
      setCompletedAlgorithms(
        Object.keys(user.completedAlgorithms).filter(
          (key) => user.completedAlgorithms[key]
        )
      );
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className={`${sharedClasses.container} flex-grow pt-0`}>
        <div className="container mx-auto px-1 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">
            Cryptographic Algorithms
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {Object.keys(algorithmDescriptions).map((algorithm) => (
              <AlgorithmCard
                key={algorithm}
                title={algorithm}
                details={algorithmDescriptions[algorithm]}
                description={algorithmDescriptions[algorithm]}
                onClick={() => handleAlgorithmClick(algorithm)}
                completed={completedAlgorithms.includes(algorithm)}
              />
            ))}
          </div>
          {!selectedAlgorithm && (
            <div className="text-center mt-8">
              <h1 className="text-3xl font-bold">Welcome to the Study Area</h1>
              <p className="text-lg mt-4">
                Here you can explore the various cryptographic algorithms. Click
                on any algorithm to learn more about it.
              </p>
            </div>
          )}

          {selectedAlgorithm && (
            <div className="bg-gray-800 p-6 mt-8 rounded-md">
              <h2 className="text-4xl font-bold mb-4">{selectedAlgorithm}</h2>
              {selectedAlgorithm === "RSA" && <StudyRSA />}
              {selectedAlgorithm === "AES" && <StudyAES />}
              {selectedAlgorithm === "DES" && <StudyDES />}
              {selectedAlgorithm === "SHA" && <StudySHA />}
              <button
                onClick={() => handleCompletion(selectedAlgorithm)}
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  completedAlgorithms.includes(selectedAlgorithm)
                    ? "bg-green-500"
                    : "bg-blue-500"
                } hover:bg-blue-700`}
              >
                {completedAlgorithms.includes(selectedAlgorithm)
                  ? "Completed"
                  : "Mark as Completed"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
