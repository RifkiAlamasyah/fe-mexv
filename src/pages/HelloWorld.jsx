// src/pages/HelloWorld.js
import React from "react";
import { Link } from "react-router-dom";
import Template from "../components/Template";

const HelloWorld = () => {
  const paramValue = "HelloReact";

  return (
    <Template>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Hello, World!</h1>
      <p className="text-lg mb-6">Selamat datang di halaman Hello World</p>
      <Link
        to={`/about-me/${paramValue}`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to About Me
      </Link>
    </div>
    </Template>
  );
};

export default HelloWorld;
