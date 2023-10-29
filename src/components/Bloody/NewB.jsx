import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker from "react-multi-date-picker";

import BloodyService from "../../services/bloody-service";

const NewB = ({ id }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
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

  useEffect(() => {
    setErrMessage("");
  }, []);

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  const newRecordHandler = () => {
    console.log(currentUser);
    const enteredSys = parseInt(sysInputRef.current.value);
    const enteredDia = parseInt(diaInputRef.current.value);
    const enteredPul = parseInt(pulInputRef.current.value);
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
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrMessage(err.response.data);
      });
  };
  return (
    <div
      id={id}
      className="modal fade"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              新增血壓紀錄
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              id="sumbmitButton"
              onClick={newRecordHandler}
              className="btn btn-primary"
            >
              新增
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewB;
