import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../store/user-context";

// import Img
import blood from "../static/Img/blood.png";

const HomeComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const toLoginHandler = () => {
    currentUser ? navigate("/calendar") : navigate("/login");
  };

  return (
    <div className="row">
      <div className="col-sm my-5">
        <h1>歡迎使用Blood Monitor</h1>
        <p>
          這是一款拍照就能記錄血壓的APP。
          只要對著血壓計拍照，就能夠輕鬆記錄血壓！
          省去手動填寫紀錄的不便，也能夠即時提醒家屬量測血壓的記錄。
        </p>
        <button onClick={toLoginHandler} className="btn btn-outline-primary">
          開始使用
        </button>
      </div>
      <div className="col-sm my-5">
        <img src={blood} alt="" width="80%" />
      </div>
    </div>
  );
};

export default HomeComponent;
