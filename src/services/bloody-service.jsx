import axios from "axios";
const API_URL = "//192.168.1.106:8000/api/bp";
const PYTHON_API_URL = "http://192.168.1.106:5000/api";
// const API_URL = "http://192.168.1.106:8000/api/bp";

// const API_URL = "http://localhost/api/bp";

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
  addRecord(sys, dia, pul, userId, addDate, remark) {
    return axios.post(
      API_URL + "/newbp",
      {
        systolicPressure: sys,
        diastolicPressure: dia,
        heartRate: pul,
        userId: userId,
        addDate: addDate,
        remark: remark,
      },
      {
        headers,
      }
    );
  }

  // export bloody record table
  postRecordSheets(params) {
    return axios.post(
      API_URL + "/postRecordSheet"
      // {
      //   systolicPressure: sys,
      //   diastolicPressure: dia,
      //   heartRate: pul,
      //   userId: userId,
      //   addDate: addDate,
      //   remark: remark,
      // },
      // {
      //   headers,
      // }
    );
  }

  // test image python recognize
  recognize_image(params) {
    return axios.post(PYTHON_API_URL + "/postPic", { params });
  }
}

export default new BloodyService();
