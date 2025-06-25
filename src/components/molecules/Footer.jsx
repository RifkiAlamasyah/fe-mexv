import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-2">MyCompany</h2>
        <p className="text-sm text-gray-400">support@mycompany.com | +62 812 3456 7890</p>
        <p className="text-sm text-gray-400">Jakarta, Indonesia</p>

        <div className="border-t border-gray-700 mt-6 pt-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} MyCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
