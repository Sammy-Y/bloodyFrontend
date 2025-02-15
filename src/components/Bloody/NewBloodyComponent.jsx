import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Modal } from "bootstrap";
import Spinner from "../UI/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import removeBtn from "../../static/Img/removeBtn.png";

import BloodyService from "../../services/bloody-service";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import "./scss/NewBloodyComponent.css";

const NewBloodyComponent = ({ id, date }) => {
  // get current user data from local storage
  const [morningData, setMorningData] = useState({
    // time: "morning",
    measureTime: "0",
    sys: "",
    dia: "",
    pul: "",
    remark: "",
    state: "add",
    // selectedFile: "",
  });
  const [afternoonData, setAfternoonData] = useState({
    // time: "afternoon",
    measureTime: "1",
    sys: "",
    dia: "",
    pul: "",
    remark: "",
    state: "add",
  });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [tabDefault, setTabDefault] = useState(""); // 記錄當前時間，預設tab選項
  const [tempSys, setTempSys] = useState("");
  const [getDataDone, setGetDataDone] = useState(true);
  const [tempDia, setTempDia] = useState("");
  const [tempPul, setTempPul] = useState("");
  const [sys, setSys] = useState("");
  const [dia, setDia] = useState("");
  const [pul, setPul] = useState("");
  const [remark, setRemark] = useState("");
  const [state, setState] = useState("add");
  const [uploadState, setUploadState] = useState("");
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
    const bloodyList = [
      { ...morningData, addDate: addDate, userId: currentUser.user.userId },
      { ...afternoonData, addDate: addDate, userId: currentUser.user.userId },
    ];
    console.log(morningData);
    console.log(afternoonData);
    console.log(bloodyList);
    BloodyService.addRecord(
      sys,
      dia,
      pul,
      currentUser.user.userId,
      addDate,
      remark,
      state,
      morningData,
      afternoonData,
      bloodyList
    )
      .then((response) => {
        console.log(response)
        if(response.data.success){
          if (state === "add") {
            window.alert("新增成功！");
          } else if (state === "edit") {
            window.alert("編輯成功！");
          }
          closeModal();
          window.location.reload();
        }else{
          setErrMessage(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrMessage(err.response.data);
      });
  };

  const handleInputChange = (event, ref, time) => {
    const inputValue = event.target.value;
    // 先switch time，在switch 欄位
    switch (time) {
      case "morning":
        switch (ref) {
          case "sys":
            setMorningData({
              ...morningData,
              sys: inputValue,
            });
            setSys(inputValue);
            break;
          case "dia":
            setMorningData({
              ...morningData,
              dia: inputValue,
            });
            setDia(inputValue);
            break;
          case "pul":
            setMorningData({
              ...morningData,
              pul: inputValue,
            });
            setPul(inputValue);
            break;
          case "remark":
            setMorningData({
              ...morningData,
              remark: inputValue,
            });
            setRemark(inputValue);
            break;
        }
        break;
      case "afternoon":
        setAfternoonData({
          ...afternoonData,
          [ref]: inputValue,
        });
        break;
    }
  };

  // 上傳附件處理
  const handleUploadImageChange = (event, time) => {
    console.log(time);
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
          setMorningData({
            ...morningData,
            selectedFile: file,
          });
          setGetDataDone(false);
          const params = {
            img_base64: reader.result,
          };
          BloodyService.recognize_image(params)
            .then((response) => {
              console.log(response);
              setTempSys(response.data.data.SYS);
              setTempDia(response.data.data.DIA);
              setTempPul(response.data.data.PLUSE);
              setUploadState(time);
              // 獲取 modal元素
              const myModal = new Modal(
                document.getElementById("confirm-bloody"),
                {
                  keyboard: false,
                }
              );
              setGetDataDone(true);
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
    setMorningData({
      // time: "morning",
      measureTime: "0",
      sys: "",
      dia: "",
      pul: "",
      remark: "",
      state: "add",
      // selectedFile: "",
    });
    setAfternoonData({
      // time: "morning",
      measureTime: "1",
      sys: "",
      dia: "",
      pul: "",
      remark: "",
      state: "add",
      // selectedFile: "",
    });
  };

  // 每當date傳進來時，就依照userId及date獲取資料
  useEffect(() => {
    // 處理預設tab
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    // 如果當前時間是下午，則預設選擇下午選項
    if (currentHour >= 12) {
      setTabDefault("afternoon");
    } else {
      setTabDefault("morning");
    }

    // 在這裡處理 date 的變化
    setSelectedDate(date);
    date = moment(new Date(date)).format("YYYY/MM/DD");
    const params = {
      userId: currentUser.user.userId,
      date: date,
    };
    BloodyService.getBP(params).then((res) => {
      if (res.data.bloodPressure.length > 0) {
        // 回傳有血壓紀錄資料
        console.log(res.data.bloodPressure);
        res.data.bloodPressure.forEach((element) => {
          switch (element.measureTime) {
            case "0": // 上午
              setMorningData({
                measureTime: element.measureTime,
                sys: element.systolicPressure,
                dia: element.diastolicPressure,
                pul: element.heartRate,
                remark: element.remark,
                state: "edit",
              });
              break;
            case "1": // 下午
              setAfternoonData({
                measureTime: element.measureTime,
                sys: element.systolicPressure,
                dia: element.diastolicPressure,
                pul: element.heartRate,
                remark: element.remark,
                state: "edit",
              });
              break;
          }
        });
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
    switch (uploadState) {
      case "morning":
        setMorningData({
          ...morningData,
          sys: tempSys,
          dia: tempDia,
          pul: tempPul,
        });
        break;
      case "afternoon":
        setAfternoonData({
          ...afternoonData,
          sys: tempSys,
          dia: tempDia,
          pul: tempPul,
        });
        break;
    }
    setSys(tempSys);
    setDia(tempDia);
    setPul(tempPul);
  };

  // tab 更換
  const timeChange = (tabSelected) => {
    setTabDefault(tabSelected);
  };

  // 關閉辨識結果開窗
  const closeRegModal = () => {
    setTempSys("");
    setTempDia("");
    setTempPul("");
  };

  const removeFile = (item) => {
    console.log(item);
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

              <Tabs
                activeKey={tabDefault}
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={(event) => timeChange(event)}
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
                      value={morningData.sys}
                      placeholder="請輸入收縮壓"
                      onChange={(event) =>
                        handleInputChange(event, "sys", "morning")
                      }
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
                      value={morningData.dia}
                      placeholder="請輸入舒張壓"
                      onChange={(event) =>
                        handleInputChange(event, "dia", "morning")
                      }
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
                      value={morningData.pul}
                      onChange={(event) =>
                        handleInputChange(event, "pul", "morning")
                      }
                    />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="formFile" className="form-label">
                      附件(Image):
                    </label>
                    <div className="row">
                      <div className="col-10">
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(event) =>
                            handleUploadImageChange(event, "morning")
                          }
                        />
                      </div>
                      <button
                        className="col remove-btn"
                        type="button"
                        onClick={() => {
                          removeFile("morning");
                        }}
                      >
                        <img src={removeBtn} alt="removeBtn" />
                      </button>
                    </div>
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
                      value={morningData.remark}
                      onChange={(event) =>
                        handleInputChange(event, "remark", "morning")
                      }
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
                      value={afternoonData.sys}
                      placeholder="請輸入收縮壓"
                      onChange={(event) =>
                        handleInputChange(event, "sys", "afternoon")
                      }
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
                      value={afternoonData.dia}
                      placeholder="請輸入舒張壓"
                      onChange={(event) =>
                        handleInputChange(event, "dia", "afternoon")
                      }
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
                      value={afternoonData.pul}
                      onChange={(event) =>
                        handleInputChange(event, "pul", "afternoon")
                      }
                    />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="formFile" className="form-label">
                      附件(Image):
                    </label>
                    <div className="row">
                      <div className="col-10">
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(event) =>
                            handleUploadImageChange(event, "afternoon")
                          }
                        />
                      </div>
                      <button
                        className="col remove-btn"
                        type="button"
                        onClick={() => {
                          removeFile("afternoon");
                        }}
                      >
                        <img src={removeBtn} alt="removeBtn" />
                      </button>
                    </div>
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
                      value={afternoonData.remark}
                      onChange={(event) =>
                        handleInputChange(event, "remark", "afternoon")
                      }
                    />
                  </div>
                </Tab>
              </Tabs>
              {/* <div className="form-group my-2">
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
              </div> */}
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
      {!getDataDone && <Spinner />}
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
