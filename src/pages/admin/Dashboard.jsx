import React, { useState, useEffect } from "react";
import Template from "../../components/Template";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/molecules/Sidebar";

const Dashboard = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [token]);

  return (
    <Template>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
          <h1 className="text-4xl font-bold mb-4 text-green-600">Hello Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* You can add dashboard widgets here later */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Total Products</h3>
              <p className="text-2xl">0</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Total Sales</h3>
              <p className="text-2xl">0</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Recent Activity</h3>
              <p className="text-sm">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Dashboard;