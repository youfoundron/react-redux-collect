import types from './actionTypes'

export default {
  openPlayer: () => ({
    type: types.OPEN_PLAYER
  }),
  playAlbum: albumId => ({
    type: types.PLAY_ALBUM,
    payload: albumId
  })
}
