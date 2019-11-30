import { observable, action } from 'mobx'

export default class VolumeStore {
  @observable
  musicVolume = {
    muted: false,
    level: 0.5,
    unmutedLevel: 0.5,
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
}
