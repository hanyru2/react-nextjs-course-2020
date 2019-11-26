import { fetchAPI } from '@lib/api'

export function getProfile({ token }) {
  return fetchAPI({
    path: `/me`,
    token,
  })
}
