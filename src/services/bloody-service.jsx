import axios from "axios";
const API_URL = "http://192.168.1.105:8000/api/bp";

// const API_URL = "http://172.20.10.11/api/bp";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : "";
const headers = {
  Authorization: `JWT ${token}`,
};

class BloodyService {
  addRecord(sys, dia, pul, userId) {
    console.log(headers);
    return axios.post(
      API_URL + "/newbp",
      {
        systolicPressure: sys,
        diastolicPressure: dia,
        heartRate: pul,
        userId: userId,
      },
      {
        headers,
      }
    );
  }
}

export default new BloodyService();
