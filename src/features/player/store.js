import { observable, action, toJS } from 'mobx'
import { shuffleArray } from '@features/player/utilities'

export default class PlayerStore {
  @observable
  nowPlaying = {
    trackId: 0,
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
    const { trackId, id, previewUrl, name, artist, image } = track
    const trackIndex = this.RootStore.queueStore.shuffleQueue.tracks.findIndex(
      resp => resp.trackId === trackId,
    )
    this.RootStore.queueStore.shuffleQueue.tracks[trackIndex].played = true

    this.nowPlaying.trackId = trackId
    this.nowPlaying.id = id
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl + '#' + Math.random()

    console.log('Now Playing:', this.nowPlaying.title)
  }

  @action
  handlePlay(status) {
    this.nowPlaying.playing = status
  }

  @action
  handlePlayNext(trackId, auto = false) {
    this.RootStore.progressStore.seekTo.number = 0
    if (this.RootStore.queueStore.shuffleQueue.tracks.length > 1) {
      const trackIndex = this.RootStore.queueStore.shuffleQueue.tracks.findIndex(
        resp => resp.trackId === trackId,
      )
      if (
        trackIndex + 1 <
        this.RootStore.queueStore.shuffleQueue.tracks.length
      ) {
        this.play(this.RootStore.queueStore.shuffleQueue.tracks[trackIndex + 1])
      } else {
        if (this.RootStore.queueStore.queue.repeat) {
          this.RootStore.queueStore.shuffleQueue.tracks.map(function(track) {
            track.played = false
            return track
          })
          if (this.RootStore.queueStore.queue.shuffle) {
            this.RootStore.queueStore.shuffleQueue.tracks = shuffleArray(
              this.RootStore.queueStore.shuffleQueue.tracks,
            )
          }
          this.play(this.RootStore.queueStore.shuffleQueue.tracks[0])
        } else {
          if (auto) {
            this.handlePlay(false)
          }
        }
      }
    } else {
      if (this.RootStore.queueStore.queue.repeat) {
        this.RootStore.queueStore.shuffleQueue.tracks.map(function(track) {
          track.played = false
          return track
        })
        this.play(this.RootStore.queueStore.shuffleQueue.tracks[0])
      } else {
        if (auto) {
          this.handlePlay(false)
        }
      }
    }
  }

  @action
  handlePlayPrev(trackId) {
    const trackIndex = this.RootStore.queueStore.queue.tracks.findIndex(
      resp => resp.trackId === trackId,
    )
    if (trackIndex - 1 >= 0) {
      this.play(this.RootStore.queueStore.shuffleQueue.tracks[trackIndex - 1])
    } else {
      if (this.RootStore.queueStore.queue.repeat) {
        this.play(
          this.RootStore.queueStore.shuffleQueue.tracks[
            this.RootStore.queueStore.shuffleQueue.tracks.length - 1
          ],
        )
      }
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

    // this.RootStore.queueStore.shuffleQueue.tracks = this.RootStore.queueStore.queue.tracks

    if (this.RootStore.queueStore.queue.shuffle) {
      this.RootStore.queueStore.shuffleQueue.tracks = shuffleArray(
        this.RootStore.queueStore.shuffleQueue.tracks,
      )
    }
  }
}
