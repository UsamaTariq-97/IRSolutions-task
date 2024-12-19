import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "../components/shared/button";
import { AuthContext } from "../context/AuthContext"; 

const MainScreen = () => {
  const { logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 
  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button
        className="btn-primary w-40 h-12"
        text="Logout"
        onClick={handleLogout} 
      />
    </div>
  );
};

export default MainScreen;
