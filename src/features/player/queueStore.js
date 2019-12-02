import { observable, action, toJS } from 'mobx'
import { shuffleArray } from '@features/player/utilities'

export default class QueueStore {
  @observable
  queue = {
    tracks: [
      {
        trackId: 0,
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

  @observable
  shuffleQueue = {
    tracks: [
      {
        trackId: 0,
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
  }

  constructor(RootStore) {
    this.RootStore = RootStore
  }

  @action
  handleAddToQueue(track) {
    track.played = false
    this.queue.tracks.push(track)
    this.shuffleQueue.tracks.push(track)

    if (this.shuffleQueue.tracks.length > 1 && this.queue.shuffle) {
    }
  }

  @action
  handleAddAllToQueue(tracks) {
    this.handleClearQueue()

    tracks.map(function(track) {
      track.played = false
      return track
    })
    this.queue.tracks = tracks
    this.shuffleQueue.tracks = tracks

    if (this.queue.shuffle) {
      this.shuffleQueue.tracks = shuffleArray(this.shuffleQueue.tracks)
    }

    this.RootStore.playerStore.play(this.shuffleQueue.tracks[0])
  }

  @action
  handleClearQueue() {
    this.queue.tracks = []
    this.shuffleQueue.tracks = []
  }
}
