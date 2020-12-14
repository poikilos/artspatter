import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.API_URL || "http://localhost:5000";

class PostService {
  getPublicItems(cid, pageNumber) {
    /*
    const params = new URLSearchParams();
    params.append('cid', cid);
    params.append('p', pageNumber);
    return axios.get(API_URL + '/api/post/all', {
      params: this.params,
    });
    */
    return axios.post(API_URL + "/api/post/all", {
      cid,
      pageNumber,
    });
  }
}

export default new PostService();

// Based on UserService by BezKoder (2019b)
