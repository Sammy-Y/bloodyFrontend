import React, { useEffect, useState } from "react";
import BloodyService from "../../services/bloody-service";
import Spinner from "../UI/Spinner";
import "./scss/BloodyDetailComponent.css";
import moment from "moment";
import { Modal } from "bootstrap";

const BloodyDetailComponent = () => {
  const [bloodyDetailList, setBloodyDetailList] = useState([]);
  const [getDataDone, setGetDataDone] = useState(false);
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState(new Date()); // 記錄選擇的日期

  const bloodyHeadList = [
    { title: "日期", width: "20%" },
    { title: "收縮壓", width: "27%" },
    { title: "舒張壓", width: "27%" },
    { title: "心跳", width: "20%" },
    // { title: "備註", width: "20%" },
  ];
  // const onChange = (newDate) => {
  //   setDate(newDate);
  // };

  // get date w/o time
  const getDay = (date) => {
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // 將"2024/01/23/21:41:51" 轉換為 "2024/01/23" 的格式
    const formattedDate = moment(date, "YYYY/MM/DD/HH:mm:ss").format(
      "YYYY/MM/DD"
    );
    return formattedDate;
  };

  // 匯出血壓紀錄表
  const exportSheets = () => {
    console.log(userId);
    const params = {
      userId: userId,
    };

    BloodyService.postRecordSheets(params).then((data) => {
      console.log(data);
    });
  };

  const handleDayClick = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
    // 獲取 modal元素
    var myModal = new Modal(document.getElementById("newBloodyBackdrop"), {
      keyboard: false,
    });
    // 開啟modal
    myModal.show();
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userId = JSON.parse(localStorage.getItem("user")).user.userId;
      setUserId(userId);
    }
  }, []);

  // 等待userId確認後才執行get detail
  useEffect(() => {
    if (userId) {
      BloodyService.getBpDetail(userId)
        .then((result) => {
          console.log(result);
          const item = result.data.data;
          setBloodyDetailList(result.data.data);
          setGetDataDone(true);
        })
        .catch((err) => {
          setGetDataDone(true);
          console.log(err);
        });
    }
  }, [userId]);

  return (
    <React.Fragment>
      {/* 尚未完成讀取DB資料 */}
      {!getDataDone && <Spinner />}
      {/* 完成讀取DB資料且資料為空 */}
      {/* 完成讀取DB資料且資料不為空 */}
      {getDataDone && (
        <div className="container my-3">
          <div className="justify-content-center">
            <div className="col col-lg-10 d-flex my-3">
              <h3>血壓歷史紀錄</h3>
              <div className="mx-4">
                <button className="btn btn-primary" id="dropdownMenuLink">
                  匯出紀錄表
                </button>
              </div>
            </div>
            {/* <div className="calendar">
              <Calendar value={date} onClickDay={handleDayClick} />
              <NewBloodyComponent id="newBloodyBackdrop" date={date} />
            </div> */}
            <div className="col col-lg-12">
              <table className="table table-hover table-bordered table-responsive blood-detail">
                <thead>
                  <tr>
                    {bloodyHeadList.map((header, index) => (
                      <th
                        key={index}
                        style={{ textAlign: "center", width: header.width }}
                      >
                        {header.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bloodyDetailList.length !== 0 &&
                    bloodyDetailList.map((bld, index) => (
                      <tr key={index}>
                        <td>{getDay(bld.userAddDate)}</td>
                        <td>{bld.systolicPressure}</td>
                        <td>{bld.diastolicPressure}</td>
                        <td>{bld.heartRate}</td>
                        {/* <td>{bld.remark}</td> */}
                        {/* <td>
                        <button
                        type="button"
                        className="btn btn-link"
                        style={{ margin: "0" }}
                        >
                        編輯
                        </button>
                        <div className="vr"></div>
                        <button type="button" className="btn btn-link">
                        刪除
                        </button>
                      </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
              {bloodyDetailList.length === 0 && (
                <div className="d-flex justify-content-center">
                  <figure className="figure">
                    <img
                      src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      className="figure-img img-fluid rounded"
                      alt="..."
                    />
                    <figcaption className="figure-caption text-center">
                      查無資料
                    </figcaption>
                  </figure>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BloodyDetailComponent;
