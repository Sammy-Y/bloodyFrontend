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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 500,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
      <div className="col col-lg-10 d-flex my-3"></div>
      <h3>圖表</h3>
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
        {/* <LineChart
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
          <XAxis dataKey="userAddDate" padding={{ left: 30, right: 30 }} />
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
          <Line type="monotone" dataKey="pul" stroke="#ff7300" />
        </LineChart> */}
      </ResponsiveContainer>
      {/* </div> */}
    </div>
  );
};

export default DashboardComponent;
