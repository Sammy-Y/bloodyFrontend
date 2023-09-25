import React, { useEffect, useState } from "react";

import AuthService from "../../services/auth-service";

const ProfileComponent = () => {
  // const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userConfirm, setUserConfirm] = useState(null);

  // console.log(typeof user);

  // AuthService.getCurrentUser().then((data) => {
  //   setUser(data.data.user);
  // });

  // useEffect(() => {
  //   AuthService.getUser().then(({ data }) => {
  //     console.log(data.user);
  //     setUser(data.user);

  //     console.log(user);
  //   });
  // }, []);

  useEffect(() => {
    const { user } = AuthService.getCurrentUser();

    setUserId(user.userId);
    setUserName(user.userName);
    setUserConfirm(user.confirmed);
  }, []);

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const changeProfileHandler = () => {
    AuthService.updateUser(userId, userName).then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
    });
    window.alert("會員資料更改成功！");
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

        {/* <div className="form-check form-switch">
          <label htmlFor="mySwitch">Line Notify</label>
          <input
            className="form-check-input"
            onChange={lineHandler}
            type="checkbox"
            id="mySwitch"
            name="darkmode"
            checked={line}
          />
        </div> */}
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
