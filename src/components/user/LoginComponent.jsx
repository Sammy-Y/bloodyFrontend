import React, { useState, useContext, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import AuthService from "../../services/auth-service";
import { UserContext } from "../../store/user-context";

import OtherLogin from "../UI/OtherLogin";

const LoginComponent = (props) => {
  // const { currentUser, setCurrentUser } = props;
  const { getCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const userIdInputRef = useRef("");
  const userPwInputRef = useRef("");

  const [errMessage, setErrMessage] = useState("");

  const loginHandler = () => {
    const enteredUserId = userIdInputRef.current.value;
    const enteredUserPw = userPwInputRef.current.value;

    AuthService.login(enteredUserId, enteredUserPw)
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // setCurrentUser(AuthService.getCurrentUser());
        getCurrentUser(AuthService.getCurrentUser());
        navigate("/");
        window.location.reload(); 
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.response.data);
      });
  };
  const toRegisterHandler = () => {
    navigate("/register");
  };

  return (
    <div className="row my-5">
      <div
        className="col-lg-4 mx-auto my-3 py-5 border rounded"
        style={{ boxShadow: "5px 5px 12px #666" }}
      >
        <h3 className="pb-3">登入</h3>

        {errMessage && (
          <div className="alert alert-danger" role="alert">
            帳號或密碼錯誤
          </div>
        )}

        <div className="form-floating mb-4 mt-2">
          <input
            type="text"
            ref={userIdInputRef}
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
            ref={userPwInputRef}
            className="form-control"
            id="userPw"
            name="userPw"
            placeholder="輸入密碼"
          />
          <label htmlFor="userPw" className="mb-1">
            密碼
          </label>
        </div>
        <div className="text-center mt-4 form-group">
          <button
            onClick={loginHandler}
            className="mx-5 btn btn-outline-primary"
          >
            登入/Login
          </button>
        </div>
        <OtherLogin />
        <div className="d-flex justify-content-center text-center mt-4 form-group">
          <p style={{ color: "gray" }}>還沒有帳號?</p>
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            註冊
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
