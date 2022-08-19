export function filterQuery(array, query = '', isShort) {
  return array.filter(item => {
    if (isShort) {
      return item.nameRU.toLowerCase().includes(query) && item.duration <= 40
    }
    return item.nameRU.includes(query);
  })
}
