import { observable, action, runInAction } from 'mobx'
import * as ProfileService from '@features/profile/services'

export default class ProfileStore {
  @observable
  userProfile = {
    image: '',
    name: '',
  }

  @action
  fetchUserProfile({ token }) {
    if (this.userProfile.name === '') {
      ProfileService.getProfile({ token }).then(response => {
        runInAction(() => {
          this.userProfile.image = response.image
          this.userProfile.name = response.name
        })
      })
    }
  }
}
