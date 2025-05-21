import React, { useState, useEffect }  from "react";
import Template from "../../components/Template";
import { NavLink, useNavigate } from "react-router-dom"; 

const Dashboard = () => {
const token = sessionStorage.getItem('token')
  const navigate = useNavigate();
useEffect(() => {
    if (!token) {
      console.log("masuk")
     return navigate('/login')
    }
  }, [token]);
  return (
    <Template>
    <div className="px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Hello Admin</h1>
    </div>
    </Template>
  );
};

export default Dashboard;
