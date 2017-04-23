import actionCreators from '../constants/actionCreators'
import { createCollect } from '../../src'
import { createCollect as immutableCreateCollect } from '../../src/immutable'
import AlbumDetail from '../components/AlbumDetail'

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
  (tracks, state) => tracks.size || tracks.length
]
const propActionOpenPlayer = [['actions', 'openPlayer']]
const propActionOnClick = [
  ['actions', 'playAlbum'],
  'onClick',
  (playAlbum, ownProps) => playAlbum.bind(null, ownProps.id)
]

const propArgs = [
  propId,
  propTitle,
  propBand,
  propFirstTrack,
  propNumTracks,
  propActionOpenPlayer,
  propActionOnClick
]

// connected components
const AlbumDetailContainer = collect(...propArgs)(AlbumDetail)
const ImmutableAlbumDetailContainer = immutableCollect(...propArgs)(AlbumDetail)

export default AlbumDetailContainer
export const immutable = ImmutableAlbumDetailContainer
