import { observable, action, toJS } from 'mobx'
import { convertSecondsToMinutes } from '@features/player/utilities'

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

  @observable
  musicVolume = {
    muted: false,
    level: 0.5,
    unmutedLevel: 0.5,
  }

  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0.0,
    duration: '0:00',
  }

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

  /* constructor(RootStore) {
    this.RootStore = RootStore
    console.log('profile ', toJS(this.RootStore.profileStore.userProfile))
  } */

  @action
  play(track) {
    const { id, previewUrl, name, artist, image } = track

    const trackIndex = this.queue.tracks.findIndex(resp => resp.id === id)
    this.queue.tracks[trackIndex].played = true
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
  handleMute(status) {
    this.musicVolume.muted = status

    if (status) {
      this.musicVolume.level = 0
    } else {
      this.musicVolume.level = this.musicVolume.unmutedLevel
    }
  }

  @action
  handleChangeVolume(sound) {
    this.musicVolume.level = parseFloat(sound)
    this.musicVolume.unmutedLevel = parseFloat(sound)

    if (sound === '0') {
      this.musicVolume.muted = true
    } else {
      this.musicVolume.muted = false
    }
  }
  @action
  handleProgressBar(progress) {
    this.progressBar = {
      timeElapsed: convertSecondsToMinutes(progress.playedSeconds),
      progress: progress.played,
      duration: convertSecondsToMinutes(progress.loadedSeconds),
    }
  }

  @action
  handleProgressClick(progress) {
    console.log(progress)
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

  @action
  handlePlayNext(id, auto = false) {
    if (this.queue.shuffle) {
      if (this.queue.tracks.length > 1) {
        let shuffles = shuffleTracks(this.queue.tracks)
        shuffles = shuffles.filter(function(item) {
          return item.played === false
        })

        if (shuffles.length === 0) {
          shuffles = this.queue.tracks.map(function(track) {
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
        if (this.queue.repeat) {
          this.play(this.queue.tracks[0])
        } else {
          if (auto) {
            this.handlePlay(false)
          }
        }
      }
    } else {
      const trackIndex = this.queue.tracks.findIndex(resp => resp.id === id)
      if (trackIndex + 1 < this.queue.tracks.length) {
        this.play(this.queue.tracks[trackIndex + 1])
      } else {
        if (this.queue.repeat) {
          this.play(this.queue.tracks[0])
        } else {
          if (auto) {
            this.handlePlay(false)
          }

          this.queue.tracks.map(function(track) {
            track.played = false
            return track
          })
        }
      }
    }
  }

  @action
  handlePlayPrev(id) {
    const trackIndex = this.queue.tracks.findIndex(resp => resp.id === id)
    if (trackIndex - 1 >= 0) {
      this.play(this.queue.tracks[trackIndex - 1])
    } else {
    }
  }

  @action
  handleRepeat() {
    this.queue.repeat = !this.queue.repeat
  }

  @action
  handleShuffle() {
    this.queue.shuffle = !this.queue.shuffle
  }
}

function shuffleTracks(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
