import React from "react";

function Navbar(){

    return (
    <nav className="flex justify-between items-center h-16 bg-gray-800">
        <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">My Website</h1>
        </div>
        <div className="flex items-center">
            <a href="/" className="px-4 py-2 text-white hover:text-gray-400 transition">Home</a>
            <a href="/about" className="px-4 py-2 text-white hover:text-gray-400 transition">About</a>
        </div>
    </nav>
    )
}

export default Navbar;