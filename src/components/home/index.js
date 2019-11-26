import React from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import colors from '@features/_ui/colors'
import AlbumList from './AlbumList'
import { Fetch, IfInview } from '@lib/api'

import * as AlbumService from '@features/album/services'

function HomePage() {
  const { token } = useMember()

  if (token === null) {
    return null
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <h1
          css={{
            color: colors.link,
            fontSize: '2em',
            padding: '50px 10px 10px',
          }}>
          New Releases
        </h1>
      </Box>
      <IfInview>
        <Fetch
          service={() =>
            AlbumService.getNewReleases({
              token,
              limit: 50,
            })
          }>
          {({ data }) => <AlbumList albums={data} />}
        </Fetch>
      </IfInview>
    </Flex>
  )
}

export default withPage({ restricted: true })(HomePage)
