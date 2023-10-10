import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

import { UserContext } from "../../store/user-context";
import BloodyService from "../../services/bloody-service";
import ToLogin from "../UI/ToLogin";
import DatePicker from "react-multi-date-picker";

const NewBloodyComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const sysInputRef = useRef(0);
  const diaInputRef = useRef(0);
  const pulInputRef = useRef(0);
  const [errMessage, setErrMessage] = useState("");
  const [addDate, setAddDate] = useState(new Date());

  const months = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  const newRecordHandler = () => {
    const enteredSys = parseInt(sysInputRef.current.value);
    const enteredDia = parseInt(diaInputRef.current.value);
    const enteredPul = parseInt(pulInputRef.current.value);
    console.log(currentUser.user.userId);
    console.log(addDate);
    const date = new Date(addDate);
    console.log(date.toLocaleDateString());

    BloodyService.addRecord(
      enteredSys,
      enteredDia,
      enteredPul,
      currentUser.user.userId
    )
      .then(() => {
        window.alert("新增成功！");
        navigate("/bloody-detail");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrMessage(err.response.data);
      });
  };

  return (
    <div className="row my-5">
      {currentUser ? (
        <div
          className="col-lg-4 mx-auto my-3 py-5 border rounded"
          style={{ boxShadow: "5px 5px 12px #666" }}
        >
          <h3 className="pb-3">新增血壓紀錄</h3>
          {errMessage && (
            <div className="alert alert-danger" role="alert">
              {errMessage}
            </div>
          )}
          <div className="form-group my-2">
            <label htmlFor="userId" className="mb-1">
              日期(DATE)：
            </label>
            <br />
            <DatePicker
              className="rmdp-mobile"
              inputClass="form-control"
              // style={{ display: "block", width: "100" }}
              // render={<InputIcon />}
              months={months}
              weekDays={weekDays}
              value={addDate}
              onChange={(date) => setAddDate(date)}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="userId" className="mb-1">
              收縮壓(SYS) :
            </label>
            <input
              type="number"
              className="form-control"
              id="SYS"
              name="SYS"
              placeholder="請輸入收縮壓"
              ref={sysInputRef}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="userPw" className="mb-1">
              舒張壓(DIA):
            </label>
            <input
              type="number"
              className="form-control"
              id="DIA"
              name="DIA"
              placeholder="請輸入舒張壓"
              ref={diaInputRef}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="userPw" className="mb-1">
              心跳(PUL):
            </label>
            <input
              type="number"
              className="form-control"
              id="PUL"
              name="PUL"
              placeholder="請輸入心跳"
              ref={pulInputRef}
            />
          </div>
          <div className="text-center mt-4 form-group">
            <button
              onClick={newRecordHandler}
              className="btn btn-outline-primary"
            >
              新增/Add
            </button>
          </div>
        </div>
      ) : (
        <ToLogin />
      )}
    </div>
  );
};

export default NewBloodyComponent;
