import React, { useEffect, useState } from "react";
import BloodyService from "../../services/bloody-service";
import Spinner from "../UI/Spinner";
import "./scss/BloodyDetailComponent.css";
import clipboardplus from "../../static/Img/clipboardplus.svg";

const BloodyDetailComponent = () => {
  const [bloodyDetailList, setBloodyDetailList] = useState([]);
  const [getDataDone, setGetDataDone] = useState(false);

  const bloodyHeadList = ["日期", "收縮壓", "舒張壓", "心跳"];

  let userId = "";

  // get date w/o time
  const getDay = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].join("/");
  };

  useEffect(() => {
    userId = JSON.parse(localStorage.getItem("user")).user.userId;

    BloodyService.getBpDetail(userId)
      .then((result) => {
        const item = result.data.data;
        setBloodyDetailList(result.data.data);
        setGetDataDone(true);
      })
      .catch((err) => {
        setGetDataDone(true);
        console.log(err);
      });
  }, []);

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
              <div>
                <button type="button" className="btn btn-primary mx-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                  新增血壓紀錄
                </button>
              </div>
            </div>
            <div className="col col-lg-10">
              <table className="table table-hover table-bordered table-responsive blood-detail">
                <thead>
                  <tr>
                    {bloodyHeadList.map((header, index) => (
                      <th key={index} style={{ textAlign: "center" }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bloodyDetailList.length !== 0 &&
                    bloodyDetailList.map((bld, index) => (
                      <tr key={index}>
                        <td>{getDay(new Date(bld.date))}</td>
                        <td>{bld.systolicPressure}</td>
                        <td>{bld.diastolicPressure}</td>
                        <td>{bld.heartRate}</td>
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
