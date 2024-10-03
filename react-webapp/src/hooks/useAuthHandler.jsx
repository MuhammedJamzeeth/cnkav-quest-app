import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance.js";

const ErrorInitiateState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const useAuthHandler = (FormInput) => {
  const [error, setError] = useState(ErrorInitiateState);
  const [loading, setLoading] = useState(false);
  const { name, email, password, confirmPassword } = FormInput;
  const navigate = useNavigate();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;
    setLoading(true);
    setError(ErrorInitiateState);

    if (!email.trim()) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email address" }));
      hasError = true;
    }
    if (!password.trim()) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      throw new Error("Error to handle signIn form.");
    }

    try {
      let username = email;
      const response = await axiosInstance.post(
        "/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200 || response.statusText === "OK") {
        const token = response.data.access_token;
        if (token) {
          try {
            localStorage.setItem("access_token", token);
            const decoded = jwtDecode(token);
            localStorage.setItem("user", JSON.stringify(decoded));
            alert("Login successfully");
            navigate("/dashboard");
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("Token not received");
        }
      }
    } catch (e) {
      if (e.response) {
        if (
          e.response.status === 401 &&
          e.response.data.detail === "Incorrect email"
        ) {
          console.log(e);
          setError((prev) => ({ ...prev, email: e.response.data.detail }));
        }
        if (
          e.response.status === 401 &&
          e.response.data.detail === "Incorrect password"
        ) {
          console.log(e);
          setError((prev) => ({ ...prev, password: e.response.data.detail }));
        }
      } else {
        console.error("An error occurred:", e.message);
        // Handle cases where e.response is undefined
        setError((prev) => ({
          ...prev,
          general: "An unexpected error occurred. Please try again later.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterSuccess(false);
    setError(ErrorInitiateState);
    let hasError = false;

    if (!name.trim()) {
      setError((prev) => ({ ...prev, name: "Name is required" }));
      hasError = true;
    } else if (name.length < 5) {
      setError((prev) => ({
        ...prev,
        name: "Name must be at least 5 characters",
      }));
      hasError = true;
    }
    if (!email.trim()) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email address" }));
      hasError = true;
    }
    if (!password.trim()) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      hasError = true;
    }
    if (!confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required",
      }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }
    if (hasError) {
      console.log(error.email + error.password + error.confirmPassword);
      setLoading(false);
      throw new Error("Error to handle signup form.");
    }

    try {
      let role = "free-tier-user";
      const response = await axiosInstance.post("/user/create", {
        name,
        email,
        password,
        role,
        customer_id: "",
      });
      console.log(response);
      if (response?.status === 201 || response?.statusText === "Created") {
        setRegisterSuccess(true);
        alert("Account created successfully");
      }
    } catch (e) {
      if (
        e?.response?.status === 409 ||
        e?.response?.statusText === "Conflict"
      ) {
        console.log(e);
        setError((prev) => ({ ...prev, email: e.response.data.detail }));
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    handleLogin,
    handleSignup,
    error,
    registerSuccess,
    setRegisterSuccess,
  };
};

export default useAuthHandler;
