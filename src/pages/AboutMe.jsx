// src/pages/AboutMe.js
import React from "react";
import { useParams } from "react-router-dom";

const AboutMe = () => {
  const { name } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-green-600">About Me</h1>
      <p className="text-lg">
        Nama yang diterima dari parameter:{" "}
        <span className="font-semibold text-green-700">{name}</span>
      </p>
    </div>
  );
};

export default AboutMe;
