import * as API from './repository'

export function getSearch(q, type, { offset = 0, limit = 10, token }) {
  return API.getSearch(q, type, { offset, limit, token }).then(response => {
    return response
  })
}
