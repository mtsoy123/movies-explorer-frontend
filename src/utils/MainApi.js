/*
class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (url, options = {}) => {
    return fetch(url, options)
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  getMovies() {
    return this._checkResponse(`${this._baseUrl}/beatfilm-movies`)
  }
}

export const movieApi = new MainApi({
  baseUrl: 'https://api.mtsoy123.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});
*/
