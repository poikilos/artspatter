import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.API_URL || "http://localhost:5000";
//formerly /api/test
//formerly ^ + 'all' etc
class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/api/show/all');
  }

  getUserBoard() {
    return axios.get(API_URL + '/api/show/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + '/api/show/mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/api/show/admin', { headers: authHeader() });
  }
}

export default new UserService();

// (BezKoder, 2019b)
