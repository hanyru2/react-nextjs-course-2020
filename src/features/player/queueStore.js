import { observable, action } from 'mobx'

export default class QueueStore {
  @observable
  queue = {
    tracks: [
      {
        id: '7b8YOVV5quZcSKEijDgyWB',
        name: 'DDU-DU DDU-DU',
        artist: 'BLACKPINK',
        albumName: 'Korea',
        image:
          'https://i.scdn.co/image/ab67616d0000b27336847c96ca27890f90aa559c',
        previewUrl:
          'https://p.scdn.co/mp3-preview/4045a51dbea3faa5d1e21adb8d5ee293f8ac412b?cid=63ad55666b3143818b506639a02b8867',
        duration: 209355,
        played: false,
      },
    ],
    repeat: false,
    shuffle: false,
  }

  @action
  handleAddToQueue(track) {
    track.played = false
    this.queue.tracks.push(track)
  }

  @action
  handleClearQueue() {
    this.queue.tracks = []
  }
}
