import React from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'

import { inject } from '@lib/store'

export default inject()(ControlPanel)

function ButtonControl({ icon, circle = false, active = false, onClick }) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 10px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      <Icon
        icon={icon}
        css={{
          color: active ? 'green' : colors.link,
          width: '10px',
        }}
      />
    </button>
  )
}

function ControlPanel({ RootStore }) {
  const { playerStore, queueStore } = RootStore
  const { trackId, playing } = playerStore.nowPlaying
  const { shuffle, repeat, tracks } = queueStore.queue

  return (
    <Flex>
      <Box>
        <ButtonControl
          icon="random"
          active={shuffle}
          onClick={() => playerStore.handleShuffle()}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-backward"
          onClick={() => playerStore.handlePlayPrev(trackId)}
        />
      </Box>
      <Box>
        <ButtonControl
          icon={playing ? 'pause' : 'play'}
          circle={true}
          onClick={() => playerStore.handlePlay(!playing)}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-forward"
          onClick={() => playerStore.handlePlayNext(trackId, false)}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="redo-alt"
          active={repeat}
          onClick={() => {
            playerStore.handleRepeat()
          }}
        />
      </Box>
    </Flex>
  )
}
