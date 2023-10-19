import axios from 'axios';
class IdeasApi {
  constructor() {
    // this._apiUrl = 'http://localhost:5000/api/ideas';
    this._apiUrl = '/api/ideas';
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }

  // post idea from the form
  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }

  deleteIdea(id) {
    // @todo we could remove the valdaiont to the IdeaList.js
    const username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    console.log(username);
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        // the ssame as username
        username: username,
      },
    });
  }

  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }
}

// we exportd all ready inistaited
export default new IdeasApi();
