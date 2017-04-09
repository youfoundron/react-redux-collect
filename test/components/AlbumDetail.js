import React from 'react'
import actionCreators from './store/actionCreators'
import { createCollect } from '../../src'
import { createCollect as immutableCreateCollect } from '../../src/immutable'

const collect = createCollect(actionCreators)
const immutableCollect = immutableCreateCollect(actionCreators)

// collect-style prop arguments
const propId = 'id'
const propTitle = ['title']
const propBand = ['artist', 'band']
const propFirstTrack = [['tracks', 0], 'firstTrack']
const propNumTracks = [
  'tracks',
  'numTracks',
  (tracks, state) => tracks.length
]
const propActionOpenPlayer = [['actions', 'openPlayer']]
const propActionOnClick = [
  ['actions', 'playAlbum'],
  'onClick',
  (playAlbum, props) => playAlbum.bind(props.id)
]

const props = [
  propId,
  propTitle,
  propBand,
  propFirstTrack,
  propNumTracks,
  propActionOpenPlayer,
  propActionOnClick
]

// stateless component
const AlbumDetailStateless = ({
  id,
  title,
  band,
  firstTrack,
  numTracks,
  openPlayer: onHover,
  onClick,
  ...props
}) =>
  <div id={id} onClick={onClick} onHover={onHover} {...props}>
    <h2>{title}</h2>
    <h3>{band}</h3>
    <ul>
      <li><label>First Track Title:</label> {firstTrack.title}</li>
      <li><label>Num of Tracks:</label> {numTracks}</li>
    </ul>
  </div>

// connected components
const AlbumDetail = collect(props)(AlbumDetailStateless)
const ImmutableAlbumDetail = immutableCollect(props)(AlbumDetailStateless)

export default AlbumDetail
export const immutable = ImmutableAlbumDetail
