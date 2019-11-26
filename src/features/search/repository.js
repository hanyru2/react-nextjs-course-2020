import { fetchAPI } from '@lib/api'

export function getSearch(q, type, { offset, limit, token }) {
  return fetchAPI({
    path: `/search`,
    token,
    params: {
      q,
      type,
      offset,
      limit,
    },
  })
}
