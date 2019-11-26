import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)

function Player({ playerStore }) {
  const { id, url, playing } = playerStore.nowPlaying
  const { muted, level } = playerStore.volume

  const playerInst = useRef(null)

  useEffect(() => {
    playerInst.current.seekTo(0)
  })

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={level}
      muted={muted}
      onProgress={data => playerStore.handleProgressBar(data)}
      onEnded={() => playerStore.handlePlayNext(id, true)}
      ref={playerInst}
    />
  )
}
