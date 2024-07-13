import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/user-context.jsx";

// for sign up success page
const SuccessComponent = () => {
  const { userName, userId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="row my-5">
      <div
        className="col-lg-4 mx-auto my-3 py-5 border rounded"
        style={{ boxShadow: "5px 5px 12px #666" }}
      >
        <h3 className="pb-3">驗證信已寄到您信箱</h3>
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
        <div className="form-group my-4">
          <h5 className="text-center">請前往信箱收取信件並進行確認。</h5>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleToLogin}
            type="submit"
            className="btn btn-primary"
          >
            返回登入頁
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessComponent;
