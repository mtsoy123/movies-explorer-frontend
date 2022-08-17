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

  /*  changeCardStatus(movie, isLiked) {
      if (isLiked === false) {
        this.likeMovie(movie)
        .then(r => {
          return r
        });
      } else {
        this.deleteMovie(movie)
        .then(r => {
          return r
        });
      }
    }*/

  changeCardStatus(movie, isLiked) {
    if (isLiked === false) {
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
    } else {
      return this._checkResponse(`${this._baseUrl}/movies/${movie._id}`, {
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
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
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
  }

  updateProfile(email, name) {
    return this._checkResponse(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({email, name}),
    })
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.mtsoy123.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});
