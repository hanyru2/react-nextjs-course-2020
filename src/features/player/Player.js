import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'

import { inject } from '@lib/store'

export default inject()(Player)

function Player({ RootStore }) {
  const { playerStore, volumeStore, progressStore } = RootStore
  const { id, url, playing } = playerStore.nowPlaying
  const { muted, level } = volumeStore.musicVolume
  const { number } = progressStore.seekTo

  const playerInst = useRef(null)

  useEffect(() => {
    playerInst.current.seekTo(number)
  }, [number])

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={level}
      muted={muted}
      onProgress={data => progressStore.handleProgressBar(data)}
      onEnded={() => playerStore.handlePlayNext(id, true)}
      ref={playerInst}
    />
  )
}
