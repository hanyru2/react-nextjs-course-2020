import React from 'react'
import { get } from 'lodash'
import { Flex, Box } from '@grid'
import Button from '@common/Button'
import colors from '@features/_ui/colors'

// AlbumDetailPage.defaultProps = {
//   data: {
//     title: 'KILL THIS LOVE',
//     subTitle: 'BLACKPINK',
//     bottomLine: '2019 • 5 Tracks',
//     image: 'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
//     tracks: [
//       {
//         name: 'Kill This Love',
//         artist: 'BLACKPINK',
//         album: 'KILL THIS LOVE',
//         image:
//           'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
//         previewUrl:
//           'https://p.scdn.co/mp3-preview/554bf24c1e0cccc09000c6fce75f08d30dc91967?cid=e4abb1ea8fdf4926a463960abd146fcb',
//         durationMs: 189052,
//       },
//       {
//         name: "Don't Know What To Do",
//         artist: 'BLACKPINK',
//         album: 'KILL THIS LOVE',
//         image:
//           'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
//         previewUrl:
//           'https://p.scdn.co/mp3-preview/9303f5daa53b082b9b09a78925fcbde3ad6668dc?cid=e4abb1ea8fdf4926a463960abd146fcb',
//         durationMs: 201081,
//       },
//       {
//         name: 'DDU-DU DDU-DU (Remix)',
//         artist: 'BLACKPINK',
//         album: 'KILL THIS LOVE',
//         image:
//           'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
//         previewUrl:
//           'https://p.scdn.co/mp3-preview/05cc17469ea45e8d928251e472e85c22226d60da?cid=e4abb1ea8fdf4926a463960abd146fcb',
//         durationMs: 201225,
//       },
//     ],
//   },

export default function DetailPageHeader({ data }) {
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
            <Button>Play</Button>
          </p>
          <p css={{ paddingTop: '15px', fontSize: '0.7em' }}>
            {data.bottomLine}
          </p>
        </div>
      </Box>
    </Flex>
  )
}
