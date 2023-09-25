import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";

const ComfirmComponent = () => {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  // const { token } = useParams();
  // verify the user by toekn and get user
  useEffect(() => {
    AuthService.verifyUser()
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data));
        }

        setUserId(data.user.userId);
        setUserName(data.user.userName);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="row my-5">
      <div
        className="col-lg-4 mx-auto my-3 py-5 border rounded"
        style={{ boxShadow: "5px 5px 12px #666" }}
      >
        <h3 className="pb-3">信箱驗證成功</h3>
        <div className="form-group my-2">
          <p htmlFor="userName" className="mb-1">
            名稱 :
          </p>
          <p className="container" id="userName">
            {userName}　先生/女士
          </p>
        </div>
        <div className="form-group my-2">
          <p htmlFor="userId" className="mb-1">
            帳號 :
          </p>
          <p className="container" id="userName">
            {userId}
          </p>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleToLogin}
            type="submit"
            className="btn btn-primary"
          >
            前往登入頁
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmComponent;
