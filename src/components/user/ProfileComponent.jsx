import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth-service";
import ConfirmComponent from "../UI/ConfirmComponent";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userConfirm, setUserConfirm] = useState(null);
  const [lineChecked, setLineChecked] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user")).user;
    AuthService.getUser(user.userId).then((response) => {
      if (response.data.token) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        user = JSON.parse(localStorage.getItem("user")).user;
        setUserId(user.userId);
        setUserName(user.userName);
        setUserConfirm(user.confirmed);
        setLineChecked(user.lineNotify);
      }
    });
  }, []);

  const lineHandler = async (e) => {
    // window.location.href = `https://notify-bot.line.me/oauth/authorize?response_type=code&scope=notify&response_mode=form_post&state=f094a459&client_id=PdLvERXPclVj8N9uUy2Tlo&redirect_uri=http://localhost:8000/user/api/linenotify&state=${userId}`;
    if (lineChecked) {
    } else {
      window.location.href = `https://notify-bot.line.me/oauth/authorize?response_type=code&scope=notify&response_mode=form_post&state=f094a459&client_id=PdLvERXPclVj8N9uUy2Tlo&redirect_uri=http://192.168.1.106:8000/user/api/linenotify&state=${userId}`;
    }

    // setLineChecked(!lineChecked);
  };

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const changeProfileHandler = () => {
    const user = {
      userId: userId,
      userName: userName,
    };

    AuthService.updateUser(user, "Profile").then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
    });
    window.alert("會員資料更改成功！");
    window.location.reload();
  };

  const sendVerifyMailHandler = () => {
    AuthService.sendVerifyMail(userId);
    window.alert("驗證信已送出！");
  };

  return (
    <div className="row my-5">
      <div
        className="col-lg-4 mx-auto my-3 py-5 border rounded"
        style={{ boxShadow: "5px 5px 12px #666" }}
      >
        <h3 className="text-center pb-3">會員資料</h3>
        {/* {errMessage && (
          <div className="alert alert-danger" role="alert">
            {errMessage}
          </div>
        )} */}
        <div className="input-group mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text px-4">帳號：</span>
          </div>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            // placeholder="輸入帳號"
            value={userId || ""}
            disabled
            readOnly
          />
          {/* check user's email confirm or not, and send verify mail to user */}
          {userConfirm ? (
            <span className="input-group-text px-4">已認證</span>
          ) : (
            <button
              onClick={sendVerifyMailHandler}
              className="btn btn-outline-primary"
            >
              寄送認證信
            </button>
          )}
        </div>
        <div className="input-group mb-4">
          <div className="input-group-prepend">
            <span className="input-group-text px-4">名稱：</span>
          </div>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            placeholder="輸入名稱"
            defaultValue={userName || ""}
            onChange={nameChangeHandler}
          />
        </div>

        <div className="row">
          <div className="col-4">訊息通知</div>
          <div className="col form-check form-switch">
            <label htmlFor="mySwitch">連接Line Notify</label>
            <input
              className="form-check-input"
              onChange={lineHandler}
              type="checkbox"
              id="mySwitch"
              name="darkmode"
              data-bs-toggle="modal"
              data-bs-target="#confirmBackdrop"
              checked={lineChecked}
            />
          </div>
          {/* open confirm modal */}
          {lineChecked && <ConfirmComponent id="confirmBackdrop" />}
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="mx-3 btn btn-outline-primary">
            返回
          </button>
          <button
            type="submit"
            onClick={changeProfileHandler}
            className="mx-3 btn btn-outline-primary"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
