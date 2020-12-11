import axios from "axios";
require('dotenv').config();

const API_URL = process.env.API_URL || "http://localhost:5000/api";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/auth/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();

// (BezKoder, 2019b)
