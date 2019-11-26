import React from 'react'
import { get } from 'lodash'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import { useRouter } from 'next/router'
import withPage from '@lib/page/withPage'

import { Fetch, IfInview } from '@lib/api'

import DetailPageHeader from '@components/_common/DetailPageHeader'
import SongList from '@common/SongList'

import * as PlaylistService from '@features/playlist/services'

function PlaylistDetailItem({ data }) {
  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1 / 3}>
        <DetailPageHeader data={data} />
      </Box>
      <Box width={2 / 3}>
        <SongList tracks={get(data, 'tracks', [])} />
      </Box>
    </Flex>
  )
}

function PlaylistDetailPage() {
  const { token } = useMember()
  const { query } = useRouter()

  if (token === null) {
    return null
  }

  return (
    <IfInview>
      <Fetch
        service={() =>
          PlaylistService.getPlaylistById(query.id, {
            token,
          })
        }>
        {({ data }) => <PlaylistDetailItem data={data} />}
      </Fetch>
    </IfInview>
  )
}

export default withPage({ restricted: true })(PlaylistDetailPage)
