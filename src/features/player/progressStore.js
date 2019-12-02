import { observable, action } from 'mobx'

import { convertSecondsToMinutes } from '@features/player/utilities'

export default class ProgressStore {
  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0.0,
    duration: '0:00',
  }

  @observable
  seekTo = {
    number: 0,
    status: false,
  }

  @action
  handleProgressBar(progress) {
    if (!this.seekTo.status) {
      this.progressBar = {
        timeElapsed: convertSecondsToMinutes(progress.playedSeconds),
        progress: progress.played,
        duration: convertSecondsToMinutes(progress.loadedSeconds),
      }
    }
  }

  @action
  handleSeekChange(value) {
    this.progressBar.progress = parseFloat(value)
  }

  @action
  handleSeekMouseUp(value) {
    this.seekTo.status = false
    if (value === '1') {
      this.seekTo.number = 0.999999
    } else {
      this.seekTo.number = parseFloat(value)
    }
  }
  @action
  handleSeekMouseDown() {
    this.seekTo.status = true
  }
}
