import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Modal } from "bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import BloodyService from "../../services/bloody-service";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

const NewBloodyComponent = ({ id, date }) => {
  // get current user data from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [tempSys, setTempSys] = useState("");
  const [tempDia, setTempDia] = useState("");
  const [tempPul, setTempPul] = useState("");
  const [sys, setSys] = useState("");
  const [dia, setDia] = useState("");
  const [pul, setPul] = useState("");
  const [remark, setRemark] = useState("");
  const [state, setState] = useState("add");
  const [errMessage, setErrMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    // const enteredSys = parseInt(sysInputRef.current.value);
    // const enteredDia = parseInt(diaInputRef.current.value);
    // const enteredPul = parseInt(pulInputRef.current.value);
    // const remark = remarkRef.current.value;
    const addDate = moment(new Date(selectedDate)).format(
      "YYYY/MM/DD/HH:mm:ss"
    );
    BloodyService.addRecord(
      sys,
      dia,
      pul,
      currentUser.user.userId,
      addDate,
      remark,
      state
    )
      .then(() => {
        if (state === "add") {
          window.alert("新增成功！");
        } else if (state === "edit") {
          window.alert("編輯成功！");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrMessage(err.response.data);
      });
  };

  const handleInputChange = (event, ref) => {
    const inputValue = event.target.value;
    console.log(inputValue);
    switch (ref) {
      case "sys":
        setSys(inputValue);
        break;
      case "dia":
        setDia(inputValue);
        break;
      case "pul":
        setPul(inputValue);
        break;
      case "remark":
        setRemark(inputValue);
        break;
    }
  };

  // 上傳附件處理
  const handleUploadImageChange = (event) => {
    if (event.target.files[0]) {
      // 如果有傳入圖片才處理辨識
      const file = event.target.files[0];
      // 檢查文件類型是否是圖片
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("請上傳圖片文件（JPEG、PNG、GIF）");
        // 清空文件選擇
        event.target.value = null;
        return;
      } else {
        // 是圖片，將檔案轉成base64格式
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(reader.result);
          const params = {
            img_base64: reader.result,
          };
          BloodyService.recognize_image(params)
            .then((response) => {
              console.log(response);
              setTempSys(response.data.data.SYS);
              setTempDia(response.data.data.DIA);
              setTempPul(response.data.data.PLUSE);
              // 獲取 modal元素
              const myModal = new Modal(
                document.getElementById("confirm-bloody"),
                {
                  keyboard: false,
                }
              );
              // 開啟modal
              myModal.show();
            })
            .catch((e) => {
              console.log(e);
            });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // 關閉modal後將所有資料清空
  const closeModal = () => {
    setSys("");
    setDia("");
    setPul("");
    setRemark("");
    setState("add");
    setErrMessage("");
  };

  // 每當date傳進來時，就依照userId及date獲取資料
  useEffect(() => {
    // 在這裡處理 date 的變化
    console.log("Selected Date:", date);
    setSelectedDate(date);
    date = moment(new Date(date)).format("YYYY/MM/DD");
    const params = {
      userId: currentUser.user.userId,
      date: date,
    };
    console.log(params);
    BloodyService.getBP(params).then((res) => {
      if (res.data.bloodPressure.length > 0) {
        // 回傳有血壓紀錄資料
        console.log(res.data.bloodPressure);
        setSys(res.data.bloodPressure[0].systolicPressure);
        setDia(res.data.bloodPressure[0].diastolicPressure);
        setPul(res.data.bloodPressure[0].heartRate);
        setRemark(res.data.bloodPressure[0].remark);
        setState("edit");
      }
    });
  }, [date]);

  // 圖片辨識完後，modal開窗確定，並將辨識結果的值給form
  const confirmBloody = () => {
    setSys(tempSys);
    setDia(tempDia);
    setPul(tempPul);
  };

  // 關閉辨識結果開窗
  const closeRegModal = () => {
    setTempSys("");
    setTempDia("");
    setTempPul("");
  };

  return (
    <>
      <div
        id={id}
        className="modal fade"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                血壓紀錄
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {errMessage && (
                <div className="alert alert-danger" role="alert">
                  {errMessage}
                </div>
              )}
              {/* <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="morning" title="上午">
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
                    value={selectedDate}
                    disabled="true"
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
                    value={sys}
                    placeholder="請輸入收縮壓"
                    onChange={(event) => handleInputChange(event, "sys")}
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
                    value={dia}
                    placeholder="請輸入舒張壓"
                    onChange={(event) => handleInputChange(event, "dia")}
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
                    value={pul}
                    onChange={(event) => handleInputChange(event, "pul")}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="formFile" className="form-label">
                    附件(Image):
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={handleUploadImageChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="remark" className="mb-1">
                    備註(Remark):
                  </label>
                  <textarea
                    className="form-control"
                    id="remark"
                    name="remark"
                    placeholder="請輸入"
                    value={remark}
                    onChange={(event) => handleInputChange(event, "remark")}
                  />
                </div>
              </Tab>
              <Tab eventKey="afternoon" title="下午">
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
                    value={selectedDate}
                    disabled="true"
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
                    value={sys}
                    placeholder="請輸入收縮壓"
                    onChange={(event) => handleInputChange(event, "sys")}
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
                    value={dia}
                    placeholder="請輸入舒張壓"
                    onChange={(event) => handleInputChange(event, "dia")}
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
                    value={pul}
                    onChange={(event) => handleInputChange(event, "pul")}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="formFile" className="form-label">
                    附件(Image):
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={handleUploadImageChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="remark" className="mb-1">
                    備註(Remark):
                  </label>
                  <textarea
                    className="form-control"
                    id="remark"
                    name="remark"
                    placeholder="請輸入"
                    value={remark}
                    onChange={(event) => handleInputChange(event, "remark")}
                  />
                </div>
              </Tab>
            </Tabs> */}
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
                  value={selectedDate}
                  disabled="true"
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
                  value={sys}
                  placeholder="請輸入收縮壓"
                  onChange={(event) => handleInputChange(event, "sys")}
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
                  value={dia}
                  placeholder="請輸入舒張壓"
                  onChange={(event) => handleInputChange(event, "dia")}
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
                  value={pul}
                  onChange={(event) => handleInputChange(event, "pul")}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="formFile" className="form-label">
                  附件(Image):
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleUploadImageChange}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="remark" className="mb-1">
                  備註(Remark):
                </label>
                <textarea
                  className="form-control"
                  id="remark"
                  name="remark"
                  placeholder="請輸入"
                  value={remark}
                  onChange={(event) => handleInputChange(event, "remark")}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
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
      <div
        id="confirm-bloody"
        className="modal fade"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                確認血壓
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group my-2">
                <label className="mb-1">收縮壓(SYS): {tempSys}</label>
              </div>
              <div className="form-group my-2">
                <label className="mb-1">舒張壓(DIA): {tempDia}</label>
              </div>
              <div className="form-group my-2">
                <label className="mb-1">心跳(PUL): {tempPul}</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeRegModal}
              >
                關閉
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={confirmBloody}
                className="btn btn-primary"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBloodyComponent;
