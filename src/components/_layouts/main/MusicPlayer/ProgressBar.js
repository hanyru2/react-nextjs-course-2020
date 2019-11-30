import React from 'react'
import { Flex, Box } from '@grid'
import { inject } from '@lib/store'

export default inject('progressStore')(ProgressBar)

function ProgressBar({ progressStore }) {
  const { timeElapsed, progress, duration } = progressStore.progressBar

  return (
    <Flex
      justifyContent="space-between"
      css={{
        background: 'transparent',
        height: '20px',
        alignItems: 'center',
      }}>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{timeElapsed}</Box>
      <Box
        css={{
          flex: 1,
          height: '4px',
          '&:hover input[type="range"]::-webkit-slider-thumb': {
            visibility: 'visible',
          },
        }}>
        <div css={{ position: 'relative' }}>
          <progress
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              zIndex: '-1',
              '&::-webkit-progress-bar': {
                borderRadius: '5px',
              },
              '&::-webkit-progress-value': {
                borderRadius: '5px',
              },
            }}
            value={progress}
            max={1}
          />
          <input
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              outline: 'none',
              background: 'transparent',
              '&::-webkit-slider-thumb': {
                visibility: 'hidden',
              },
            }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress}
            onMouseDown={() => progressStore.handleSeekMouseDown()}
            onChange={e => progressStore.handleSeekChange(e.target.value)}
            onMouseUp={e => progressStore.handleSeekMouseUp(e.target.value)}
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{duration}</Box>
    </Flex>
  )
}
