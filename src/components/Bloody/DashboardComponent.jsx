import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import BloodyService from "../../services/bloody-service";
import moment from "moment";

const DashboardComponent = () => {
  const [userId, setUserId] = useState("");
  const [bloodyDetailList, setBloodyDetailList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userId = JSON.parse(localStorage.getItem("user")).user.userId;
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      BloodyService.getBpDetail(userId)
        .then((result) => {
          console.log(result);
          const bpList = result.data.data.map((item) => {
            return {
              ...item,
              userAddDate: moment(item.userAddDate, "YYYY/MM/DD").format("DD"),
              sys: item.systolicPressure,
              dia: item.diastolicPressure,
              pul: item.heartRate,
            };
          });
          console.log(bpList);
          setBloodyDetailList(bpList);
          // setGetDataDone(true);
        })
        .catch((err) => {
          // setGetDataDone(true);
          console.log(err);
        });
    }
  }, [userId]);
  return (
    <div className="container my-3" style={{ height: "400px" }}>
      {/* <div className="justify-content-center"> */}
      <div className="col col-lg-10 d-flex my-3">
        <h3>圖表</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={bloodyDetailList}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userAddDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sys" stroke="#82ca9d" />
          <Line
            type="monotone"
            dataKey="dia"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* </div> */}
    </div>
  );
};

export default DashboardComponent;
