import React, { useState } from 'react'
import { get } from 'lodash'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'
import { Router } from '@router'

import { Fetch, IfInview } from '@lib/api'

import * as SearchService from '@features/search/services'

// api search : https://developer.spotify.com/documentation/web-api/reference/search/search/

function SearchItems({ data }) {
  const albums = get(data, 'albums.items', [])
  const playlists = get(data, 'playlists.items', [])

  return (
    <div>
      <SearchResults title="Albums" data={albums} route="album-detail" />
      <SearchResults
        title="Playlists"
        data={playlists}
        route="playlist-detail"
      />{' '}
    </div>
  )
}

function SearchPage() {
  const { token } = useMember()
  const [keyword, setKeyword] = useState('')
  const type = 'album,playlist'

  if (token === null) {
    return null
  }

  function handleOnChange(e) {
    setKeyword(e.target.value)
    Router.pushRoute('search', { keyword: e.target.value })
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <input
          type="text"
          value={keyword}
          placeholder="Search for artists, albums or playlists..."
          css={{
            padding: '15px 20px',
            borderRadius: '40px',
            border: 'none',
            width: '500px',
          }}
          onChange={handleOnChange}
        />
      </Box>
      {keyword !== '' && (
        <IfInview>
          <Fetch
            service={() =>
              SearchService.getSearch(keyword, type, {
                offset: 0,
                limit: 10,
                token,
              })
            }>
            {({ data }) => <SearchItems data={data} />}
          </Fetch>
        </IfInview>
      )}
    </Flex>
  )
}

export default withPage({ restricted: true })(SearchPage)
