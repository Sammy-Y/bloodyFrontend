import React from "react";
import { useNavigate } from "react-router-dom";

const ToLogin = () => {
  const navigate = useNavigate();
  const toLoginHandler = () => {
    navigate("/login");
  };

  return (
    <div>
      <p>尚未登入，請先登入會員資料。</p>
      <button onClick={toLoginHandler} className="btn btn-outline-primary">
        前往登入
      </button>
    </div>
  );
};

export default ToLogin;
