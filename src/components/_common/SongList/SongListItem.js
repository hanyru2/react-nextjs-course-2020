import React, { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Flex, Box } from '@grid'
import colors from '@features/_ui/colors'
import { convertSecondsToMinutes } from '@features/player/utilities'

import { inject } from '@lib/store'

export default inject()(SongListItem)

function SongListItem({ RootStore, track, inQueue }) {
  const { playerStore, queueStore } = RootStore
  const [hover, setHover] = useState(false)
  const { trackId, playing } = playerStore.nowPlaying

  if (track.previewUrl === null) {
    return null
  }

  function checkInQueue(inQueue) {
    if (!inQueue) {
      queueStore.handleClearQueue()
      queueStore.handleAddToQueue(track)
    }

    if (trackId === track.trackId && playing) {
      playerStore.handlePlay(!playing)
    } else {
      playerStore.play(track)
    }
  }

  return (
    <Box
      width={1}
      css={{
        '&:hover': {
          background: colors.background.light,
        },
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
      <Flex
        flexWrap="wrap"
        css={{
          padding: '8px 20px',
        }}>
        <Box css={{ padding: '5px', alignSelf: 'center' }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => checkInQueue(inQueue)}>
            <Icon
              icon={
                trackId === track.trackId
                  ? playing
                    ? 'pause'
                    : 'play'
                  : hover
                  ? 'play'
                  : 'music'
              }
              css={{ color: colors.link }}
            />
          </button>
        </Box>
        <Box
          css={{
            flex: 1,
            padding: '5px',
          }}>
          <Flex
            flexWrap="wrap"
            css={{
              padding: '0px 20px 0px 0px',
            }}>
            <Box width={1} css={{ color: colors.link }}>
              {track.name}
            </Box>
            <Box width={1} css={{ fontSize: '0.9em', paddingTop: '10px' }}>
              {track.artist} • {track.albumName}
            </Box>
          </Flex>
        </Box>
        <Box
          css={{
            padding: '0px 10px',
            fontSize: '0.85em',
            color: colors.link,
          }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => queueStore.handleAddToQueue(track)}>
            <Icon
              icon="plus-circle"
              css={{
                color: colors.link,
              }}
            />
          </button>
        </Box>
        <Box
          css={{
            paddingTop: '5px',
            fontSize: '0.85em',
          }}>
          {convertSecondsToMinutes(track.duration / 1000)}
        </Box>
      </Flex>
    </Box>
  )
}
