import {MOVIE_LENGTH} from './Constant';

export function filterQuery(array, query = '', isShort) {
  if (!query && isShort) {
    return array.filter(item => {
      return item.duration <= MOVIE_LENGTH
    })
  }

  if (!query) {
    return array
  }
  return array.filter(item => {
    if (isShort) {
      return item.nameRU.toLowerCase().includes(query.toLowerCase()) && item.duration <= MOVIE_LENGTH
    }
    return item.nameRU.toLowerCase().includes(query.toLowerCase());
  })
}
