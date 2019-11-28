import React from 'react'
import { flowRight as compose } from 'lodash'
import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'
import { signOut } from '@features/_auth'

import { inject } from '@lib/store'

function AccountPage({ profileStore }) {
  const { isAuthenticated } = useMember()

  if (!isAuthenticated) {
    return null
  }

  const { name } = profileStore.userProfile

  return (
    <div>
      <p>Current User: {name}</p>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  )
}

export default compose(
  withPage({ restricted: true }),
  inject('profileStore'),
)(AccountPage)
