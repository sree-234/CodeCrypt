import React from "react";

const RSA = ({ handleCompletion, completedAlgorithms }) => {
  return (
    <div>
      {/* Content for RSA Algorithm */}
      {/* Replace with your RSA content */}
      <h1>RSA Algorithm</h1>
      <p>Content specific to RSA...</p>

      {/* Completion Button */}
      <button
        onClick={() => handleCompletion("RSA")}
        className={`mt-4 px-4 py-2 rounded-md text-white ${
          completedAlgorithms.includes("RSA") ? "bg-green-500" : "bg-blue-500"
        } hover:bg-blue-700`}
      >
        {completedAlgorithms.includes("RSA")
          ? "Completed"
          : "Mark as Completed"}
      </button>
    </div>
  );
};

export default RSA;
