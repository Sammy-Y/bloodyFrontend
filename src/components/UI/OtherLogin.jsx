import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import AuthService from "../../services/auth-service";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../store/user-context";

// import img
import lineImg from "../../static/Img/line.png";
import googleImg from "../../static/Img/google.png";

const OtherLogin = () => {
  const { getCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const clientId =
    "521506941615-kp0m0f2rq50d3n1krc86sem7cnmq8tf1.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  const googleRegister = () => {
    window.open("http://192.168.1.105:8000/user/auth/google", "_self");
    // AuthService.googleLogin();
  };
  const responseGoogle = (response) => {
    AuthService.googleLoginNew(response.profileObj).then((res) => {
      console.log("success", response.profileObj);
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      getCurrentUser(AuthService.getCurrentUser());
      navigate("/");
    });
  };
  const error = (response) => {
    console.log(response);
  };

  return (
    <div>
      <div className="text-center my-3">
        <p style={{ fontSize: "0.75rem", color: "gray" }}>或</p>
      </div>
      <div className="d-flex">
        {/* 20231018，add google login button and styling */}
        <GoogleLogin
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="d-flex btn btn-outline-secondary mx-3 justify-content-center"
              style={{ width: "12rem" }}
            >
              <div className="mx-1">
                <img src={googleImg} style={{ width: "20px" }} alt="google" />
              </div>
              <div className="mx-1">Google</div>
            </button>
          )}
          clientId={clientId}
          buttonText="Google"
          onSuccess={responseGoogle}
          onFailure={error}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
        />
        {/* <button
          onClick={googleRegister}
          className="d-flex btn btn-outline-secondary mx-3 justify-content-center"
          style={{ width: "12rem" }}
        >
          <div className="mx-1">
            <img src={googleImg} style={{ width: "20px" }} alt="google" />
          </div>
          <div className="mx-1">Google</div>
        </button> */}
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
