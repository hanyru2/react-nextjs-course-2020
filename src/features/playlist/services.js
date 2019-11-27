import * as API from './repository'
import { get } from 'lodash'

export function getPlaylistById(id, { token }) {
  return API.getPlaylistById(id, { token }).then(response => {
    const id = get(response, 'id', 0)
    const title = get(response, 'name', '')
    const image = get(response, 'images[0].url', '')
    const subTitle = get(response, 'owner.display_name', '')
    const bottomLine = get(response, 'tracks.total', 0) + ' Tracks'
    const tracksItems = get(response, 'tracks.items', [])
    const tracks = tracksItems.map(resp => ({
      id: resp.track.id,
      name: resp.track.name,
      duration: resp.track.duration_ms,
      artist: resp.track.artists[0].name,
      previewUrl: resp.track.preview_url,
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

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token }).then(response => {
    return response.items ? response.items : []
  })
}
