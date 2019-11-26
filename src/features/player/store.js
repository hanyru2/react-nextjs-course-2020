import { observable, action } from 'mobx'
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
  }

  @observable
  volume = {
    muted: false,
    level: 0.5,
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
      },
    ],
  }

  @action
  play(track) {
    const { id, previewUrl, name, artist, image } = track

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
    this.volume.muted = status
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
    this.queue.tracks.push(track)
  }

  @action
  handleRepeat(track) {
    this.nowPlaying = {}

    this.nowPlaying = track
  }
}
