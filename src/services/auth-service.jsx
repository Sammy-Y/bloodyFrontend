import axios from "axios";
const API_URL = "http://192.168.1.105:8000/user";

// const API_URL = "http://172.20.10.9:8000/user";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : "";

class AuthService {
  register(userName, userId, userPw) {
    console.log(userName);
    return axios.post(API_URL + "/register", {
      userName: userName,
      userId: userId,
      userPw: userPw,
    });
  }

  verifyUser(token) {
    return axios.get(`${API_URL}/confirmation/${token}`);
  }

  login(userId, userPw) {
    return axios.post(API_URL + "/login", {
      userId: userId,
      userPw: userPw,
    });
  }

  googleLogin() {
    return axios.get(API_URL + "/auth/google");
  }
  googleLoginNew(userData) {
    console.log(userData);
    return axios.post(API_URL + "/google/login", {
      userData: userData,
    });
  }

  logout() {
    return localStorage.removeItem("user");
  }

  getCurrentUser() {
    // if (token) {
    //   return axios.get(API_URL + "/getUser/" + token);
    // } else return localStorage.getItem("user");

    return JSON.parse(localStorage.getItem("user"));
  }

  getUser() {
    return axios.get(API_URL + "/getUser/" + token);
  }

  sendVerifyMail(userId) {
    return axios.post(API_URL + "/sendVerify", { userId: userId });
  }

  updateUser(userId, userName) {
    return axios.post(API_URL + "/update", {
      userId: userId,
      userName: userName,
    });
  }
}

export default new AuthService();
