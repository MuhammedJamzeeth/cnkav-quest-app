import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const UseLogoutHandler = () => {
  const navigate = useNavigate();
  const LogOut = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    navigate("/");
  }, [navigate]);
  return {
    LogOut,
  };
};

export default UseLogoutHandler;
