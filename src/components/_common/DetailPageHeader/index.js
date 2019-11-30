import React from 'react'
import { Flex, Box } from '@grid'
import Button from '@common/Button'
import colors from '@features/_ui/colors'

import { inject } from '@lib/store'

export default inject()(DetailPageHeader)

function DetailPageHeader({ data, RootStore }) {
  const { playerStore, queueStore } = RootStore
  const { tracks } = data
  function playSongList() {
    queueStore.handleClearQueue()
    tracks.map(function(track) {
      queueStore.handleAddToQueue(track)
    })

    playerStore.play(tracks[0])
  }
  return (
    <Flex flexWrap="wrap" css={{ padding: '20px 70px' }}>
      <Box width={1}>
        <img src={data.image} />
        <div css={{ textAlign: 'center' }}>
          <h1
            css={{
              color: colors.link,
              fontSize: '1.6em',
              fontWeight: 'bold',
              lineHeight: 1.5,
              padding: '8px 0 10px',
            }}>
            {data.title}
          </h1>
          <p css={{ padding: '0 0 40px', fontSize: '0.8em' }}>
            {data.subTitle}
          </p>

          <p>
            <Button onClick={playSongList}>Play</Button>
          </p>
          <p css={{ paddingTop: '15px', fontSize: '0.7em' }}>
            {data.bottomLine}
          </p>
        </div>
      </Box>
    </Flex>
  )
}
