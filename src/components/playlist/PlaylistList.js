import React from 'react'
import { Flex, Box } from '@grid'

import Link from '@link'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import { Fetch, IfInview } from '@lib/api'

import * as PlaylistService from '@features/playlist/services'

function PlaylistItems({ playlists }) {
  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      {playlists.map(function(playlist) {
        return (
          <Box width={1 / 6} px={10} py={10} key={playlist.id}>
            <article>
              <Link route="playlist-detail" params={{ id: playlist.id }}>
                <a>
                  <img src={playlist.images[0].url} />
                </a>
              </Link>
              <h3
                css={{
                  fontSize: '0.8em',
                  fontWeight: 'bold',
                  lineHeight: '1.5',
                  marginTop: '10px',
                  textAlign: 'center',
                }}>
                <Link route="playlist-detail" params={{ id: playlist.id }}>
                  <a>{playlist.name}</a>
                </Link>
              </h3>
            </article>
          </Box>
        )
      })}
    </Flex>
  )
}

function PlaylistListPage() {
  const { token } = useMember()

  if (token === null) {
    return null
  }

  return (
    <IfInview>
      <Fetch
        service={() =>
          PlaylistService.getMyPlaylist({
            token,
          })
        }>
        {({ data }) => <PlaylistItems playlists={data} />}
      </Fetch>
    </IfInview>
  )
}

export default withPage({ restricted: true })(PlaylistListPage)
