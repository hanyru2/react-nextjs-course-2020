import { observable, action, toJS } from 'mobx'
import { shuffleArray } from '@features/player/utilities'

export default class PlayerStore {
  @observable
  nowPlaying = {
    id: '7b8YOVV5quZcSKEijDgyWB',
    playing: false,
    title: 'DDU-DU DDU-DU',
    subTitle: 'BLACKPINK',
    image: 'https://i.scdn.co/image/ab67616d0000b27336847c96ca27890f90aa559c',
    url:
      'https://p.scdn.co/mp3-preview/4045a51dbea3faa5d1e21adb8d5ee293f8ac412b?cid=63ad55666b3143818b506639a02b8867',
    duration: 209355,
  }

  constructor(RootStore) {
    this.RootStore = RootStore
    // console.log('profile ', toJS(this.RootStore.profileStore.userProfile))
  }

  @action
  play(track) {
    const { id, previewUrl, name, artist, image } = track
    const trackIndex = this.RootStore.queueStore.queue.tracks.findIndex(
      resp => resp.id === id,
    )
    this.RootStore.queueStore.queue.tracks[trackIndex].played = true
    this.nowPlaying.id = id
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl

    console.log('Now Playing:', this.nowPlaying.title)
  }

  @action
  handlePlay(status) {
    this.nowPlaying.playing = status
  }

  @action
  handlePlayNext(id, auto = false) {
    if (this.RootStore.queueStore.queue.shuffle) {
      if (this.RootStore.queueStore.queue.tracks.length > 1) {
        let shuffles = shuffleArray(this.RootStore.queueStore.queue.tracks)
        shuffles = shuffles.filter(function(item) {
          return item.played === false
        })

        if (shuffles.length === 0) {
          shuffles = this.RootStore.queueStore.queue.tracks.map(function(
            track,
          ) {
            track.played = false
            return track
          })
        }

        if (shuffles[0].id === id) {
          this.play(shuffles[1])
        } else {
          this.play(shuffles[0])
        }
      } else {
        if (this.RootStore.queueStore.queue.repeat) {
          this.RootStore.progressStore.seekTo.number = 0
        } else {
          if (auto) {
            this.handlePlay(false)
          }
        }
      }
    } else {
      const trackIndex = this.RootStore.queueStore.queue.tracks.findIndex(
        resp => resp.id === id,
      )
      if (trackIndex + 1 < this.RootStore.queueStore.queue.tracks.length) {
        this.play(this.RootStore.queueStore.queue.tracks[trackIndex + 1])
      } else {
        if (this.RootStore.queueStore.queue.repeat) {
          this.RootStore.progressStore.seekTo.number = 0
        } else {
          if (auto) {
            this.handlePlay(false)
          }

          this.RootStore.queueStore.queue.tracks.map(function(track) {
            track.played = false
            return track
          })
        }
      }
    }
  }

  @action
  handlePlayPrev(id) {
    const trackIndex = this.RootStore.queueStore.queue.tracks.findIndex(
      resp => resp.id === id,
    )
    if (trackIndex - 1 >= 0) {
      this.play(this.RootStore.queueStore.queue.tracks[trackIndex - 1])
    } else {
    }
  }

  @action
  handleRepeat() {
    this.RootStore.queueStore.queue.repeat = !this.RootStore.queueStore.queue
      .repeat
  }

  @action
  handleShuffle() {
    this.RootStore.queueStore.queue.shuffle = !this.RootStore.queueStore.queue
      .shuffle
  }
}
