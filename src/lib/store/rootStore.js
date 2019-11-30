import { configure } from 'mobx'

import UIStore from '@features/_ui/store'
import ErrorStore from '@features/_error/store'
import PlayerStore from '@features/player/store'
import ProfileStore from '@features/profile/store'
import QueueStore from '@features/player/queueStore'
import VolumeStore from '@features/player/volumeStore'
import ProgressStore from '@features/player/progressStore'

configure({ enforceActions: 'observed' })

export default class RootStore {
  constructor() {
    this.uiStore = new UIStore(this)
    this.errorStore = new ErrorStore(this)

    this.profileStore = new ProfileStore(this)
    this.playerStore = new PlayerStore(this)
    this.queueStore = new QueueStore(this)
    this.volumeStore = new VolumeStore(this)
    this.progressStore = new ProgressStore(this)
  }
}
