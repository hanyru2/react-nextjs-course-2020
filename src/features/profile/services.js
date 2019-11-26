import * as API from './repository'
import { get } from 'lodash'

export function getProfile({ token }) {
  return API.getProfile({ token }).then(response => {
    return {
      name: get(response, 'display_name', ''),
      image: get(response, 'images[0].url', ''),
    }
  })
}
