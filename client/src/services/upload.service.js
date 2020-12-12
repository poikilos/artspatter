import axios from "axios";
import authHeader from './auth-header';
require('dotenv').config();

const API_URL = process.env.API_URL || "http://localhost:5000";

class UploadService {
  upload(formData) {
    return axios.post(
      API_URL + "/api/post/upload",
      formData,
      { headers: authHeader() },
    );
  }
}

export default new UploadService();

// This is based on AuthService by BezKoder (2019b).
