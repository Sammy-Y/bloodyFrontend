import React from "react";
import AuthService from "../../services/auth-service";

// import img
import lineImg from "../../static/Img/line.png";
import googleImg from "../../static/Img/google.png";

const OtherLogin = () => {
  const googleRegister = () => {
    window.open("http://192.168.1.105:8000/user/auth/google", "_self");
    // AuthService.googleLogin();
  };

  return (
    <div>
      <div className="text-center my-3">
        <p style={{ fontSize: "0.75rem", color: "gray" }}>或</p>
      </div>
      <div className="d-flex">
        <button
          onClick={googleRegister}
          className="d-flex btn btn-outline-secondary mx-3 justify-content-center"
          style={{ width: "12rem" }}
        >
          <div className="mx-1">
            <img src={googleImg} style={{ width: "20px" }} alt="google" />
          </div>
          <div className="mx-1">Google</div>
        </button>
        <button
          className="d-flex btn btn-outline-secondary mx-3 justify-content-center"
          style={{ width: "12rem" }}
        >
          <div className="mx-1">
            <img src={lineImg} style={{ width: "24px" }} alt="google" />
          </div>
          <div className="mx-1">Line</div>
        </button>
      </div>
    </div>
  );
};

export default OtherLogin;
