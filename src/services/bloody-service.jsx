import axios from "axios";
// const API_URL = "https://192.168.1.106:8000/api/bp";

const API_URL = "http://localhost/api/bp";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : "";
const headers = {
  Authorization: `JWT ${token}`,
};

class BloodyService {
  // get all bloody info
  getBpDetail(userId) {
    console.log(userId);
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
