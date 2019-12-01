import * as API from './repository'
import { get } from 'lodash'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit }).then(response => {
    return response.albums ? response.albums.items : []
  })
}

export function getAlbumById(id, { token }) {
  return API.getAlbumById(id, { token }).then(response => {
    const id = get(response, 'id', '')
    const image = get(response, 'images[0].url', '')
    const title = get(response, 'name', '')
    const artists = get(response, 'artists', [])
    const subTitle = artists[0].name
    const bottomLine =
      get(response, 'release_date', '') +
      ' • ' +
      get(response, 'total_tracks', 0) +
      ' Songs'
    const tracksItems = get(response, 'tracks.items', [])
    const tracks = tracksItems.map(resp => ({
      trackId: Math.random(),
      id: resp.id,
      name: resp.name,
      duration: resp.duration_ms,
      artist: resp.artists[0].name,
      previewUrl: resp.preview_url,
      image: image,
      albumName: title,
    }))

    return {
      id,
      title,
      image,
      subTitle,
      bottomLine,
      tracks: tracks.filter(function(track) {
        return track.previewUrl !== null
      }),
    }
  })
}
