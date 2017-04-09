import R from 'ramda'
import types from '../constants/actionTypes'
import initialState, { immutable as immutableInitialState } from './initialState'

const makeReducer = helpers => (state, action) => {
  switch (action.type) {
    case (types.OPEN_PLAYER):
      return helpers.openPlayer(state)
    case (types.PLAY_ALBUM):
      return helpers.playAlbum(state, action.payload)
  }
}

export default makeReducer({
  openPlayer: state =>
    R.assocPath(['player', 'open'], true),
  playAlbum: (albumId, state) =>
    R.assocPath(['player', 'albumId'], albumId)
}, initialState)

export const immutable = makeReducer({
  openPlayer: state =>
    state.setIn(['player', 'open'], true),
  playAlbum: (albumId, state) =>
    state.setIn(['player', 'albumId'], albumId)
}, immutableInitialState)
