import React from "react";
import { useNavigate } from "react-router-dom";

const SkipButton = ({
  businessUrl = "/registerbusiness",
  userUrl = "/home",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleSkip = () => {
    const token = localStorage.getItem("token");
    let userType = null;

    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        userType = payload.userType;
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }

    if (userType === "business") {
      navigate(businessUrl);
    } else {
      navigate(userUrl);
    }
  };

  return (
    <button
      onClick={handleSkip}
      className={`text-gray-700 font-semibold text-left hover:underline transition ${className}`}
    >
      Skip
    </button>
  );
};

export default SkipButton;
