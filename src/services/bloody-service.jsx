import axios from "axios";
const API_URL = "http://192.168.1.108:8000/api/bp";

// const API_URL = "http://172.20.10.11/api/bp";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : "";
const headers = {
  Authorization: `JWT ${token}`,
};

class BloodyService {
  // get all bloody info
  getBpDetail(userId) {
    return axios.get(API_URL + "/getAllbp/" + userId, {
      headers,
    });
  }

  // add new bloody record
  addRecord(sys, dia, pul, userId, addDate) {
    return axios.post(
      API_URL + "/newbp",
      {
        systolicPressure: sys,
        diastolicPressure: dia,
        heartRate: pul,
        userId: userId,
        addDate: addDate,
      },
      {
        headers,
      }
    );
  }
}

export default new BloodyService();
