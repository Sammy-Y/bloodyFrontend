import axios from "axios";
const API_URL = "http://192.168.1.108:8000/user";

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

  lineNotify() {
    return axios.post(API_URL + "/api/linenotify");
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

  getUser(userId) {
    return axios.get(API_URL + "/userProfile/" + userId);
  }

  sendVerifyMail(userId) {
    return axios.post(API_URL + "/sendVerify", { userId: userId });
  }

  updateUser(user, state) {
    return axios.post(API_URL + "/update", {
      user: user,
      state: state,
    });
  }
}

export default new AuthService();
