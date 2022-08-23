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
    return this._checkResponse(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
  }

  changeCardStatus(movieProps, likedMovie) {
    if (likedMovie.length === 0) {
      return this._checkResponse(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          country: movieProps.country,
          director: movieProps.director,
          duration: movieProps.duration,
          year: movieProps.year,
          description: movieProps.description,
          image: `https://api.nomoreparties.co${movieProps.image.url}`,
          trailerLink: movieProps.trailerLink,
          nameRU: movieProps.nameRU,
          nameEN: movieProps.nameEN,
          thumbnail: `https://api.nomoreparties.co${movieProps.image.formats.thumbnail.url}`,
          movieId: movieProps.id,
        })
      })
    } else {
      return this._checkResponse(`${this._baseUrl}/movies/${likedMovie[0]._id}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
    }
  }

  likeMovie(movie) {
    return this._checkResponse(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
    })
  }

  deleteMovie(id) {
    return this._checkResponse(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
  }

  signup(email, password, name) {
    return this._checkResponse(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password, name}),
    })
    .then((res) => {
      return res;
    })
    .catch(err => console.log(err))
  }

  signin(email, password) {
    return this._checkResponse(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({email, password})
    })
    .then((data) => {
      // console.log(data)
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
  }

  getProfile(token) {
    return this._checkResponse(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true,
      credentials: 'include',
    })
  }

  signOut() {
    return this._checkResponse(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => {
      return res
    })
    .catch(err => console.log(err))
  }

  updateProfile(name, email) {
    return this._checkResponse(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({email: email, name: name}),
    })
  }
}

export const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.mtsoy123.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});
