import axios from "axios";
require('dotenv').config();

const API_URL = process.env.API_URL || "http://localhost:5000/api/auth/";

class UploadService {
  upload(title, description, image) {
    return axios.post(API_URL + "upload", {
      title,
      description,
      image,
    });
  }
}

export default new UploadService();

// This is based on AuthService by BezKoder (2019b).
