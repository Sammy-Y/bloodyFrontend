import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthService from "../../services/auth-service";
import { UserContext } from "../../store/user-context.jsx";

import OtherLogin from "../UI/OtherLogin";

const SignupComponent = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeUserID = (e) => {
    setUserId(e.target.value);
  };
  const handleChangeUserPW = (e) => {
    setUserPw(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(userName, userId, userPw)
      .then(() => {
        registerUser({ userName, userId }); // use context, reducer
        navigate("/register/success");
      })
      .catch((err) => setErrMessage(err.response.data));
  };

  return (
    <div className="row my-5">
      <div
        className="col-lg-4 mx-auto my-3 py-5 border rounded"
        style={{ boxShadow: "5px 5px 12px #666" }}
      >
        <h3 className="pb-3">註冊</h3>
        {errMessage && (
          <div className="alert alert-danger" role="alert">
            {errMessage}
          </div>
        )}
        <div className="form-floating mb-4 mt-2">
          <input
            type="text"
            onChange={handleChangeUserName}
            className="form-control"
            id="userName"
            name="userName"
            placeholder="輸入名稱"
          />
          <label htmlFor="userName" className="mb-1">
            名稱
          </label>
        </div>
        <div className="form-floating mb-4 mt-2">
          <input
            type="text"
            onChange={handleChangeUserID}
            className="form-control"
            id="userId"
            name="userId"
            placeholder="輸入帳號"
          />
          <label htmlFor="userId" className="mb-1">
            帳號
          </label>
        </div>
        <div className="form-floating mb-4 mt-2">
          <input
            type="password"
            onChange={handleChangeUserPW}
            className="form-control"
            id="userPw"
            name="userPw"
            placeholder="輸入密碼"
          />
          <label htmlFor="userPw" className="mb-1">
            密碼
          </label>
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            onClick={handleRegister}
            className="btn btn-outline-primary"
          >
            註冊/Sign up
          </button>
        </div>
        <OtherLogin />
        <div className="d-flex justify-content-center text-center mt-4 form-group">
          <p style={{ color: "gray" }}>已經有帳號?</p>
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            登入
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
