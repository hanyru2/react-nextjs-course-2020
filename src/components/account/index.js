import React from 'react'

import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'
import { signOut } from '@features/_auth'
import { Fetch, IfInview } from '@lib/api'

import * as ProfileService from '@features/profile/services'

function AccountPage() {
  const { profile, isAuthenticated, token } = useMember()

  if (!isAuthenticated) {
    return null
  }

  return (
    <IfInview>
      <Fetch service={() => ProfileService.getProfile({ token })}>
        {({ data }) => {
          const { name } = data
          return (
            <div>
              <p>Current User: {name}</p>
              <button onClick={() => signOut()}>Log out</button>
            </div>
          )
        }}
      </Fetch>
    </IfInview>
  )
}

export default withPage({ restricted: true })(AccountPage)
