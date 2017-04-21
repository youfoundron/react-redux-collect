import R from 'ramda'
import types from '../constants/actionTypes'
import initialState, { immutable as immutableInitialState } from './initialState'

const makeReducer = (helpers, _state) => (state = _state, action) => {
  switch (action.type) {
    case (types.OPEN_PLAYER):
      return helpers.openPlayer(state)
    case (types.PLAY_ALBUM):
      return helpers.playAlbum(state, action.payload)
    default:
      return state
  }
}

export default makeReducer({
  openPlayer: state =>
    R.assocPath(['player', 'open'], true, state),
  playAlbum: (state, albumId) =>
    R.assocPath(['player', 'albumId'], albumId, state)
}, initialState)

export const immutable = makeReducer({
  openPlayer: state =>
    state.setIn(['player', 'open'], true),
  playAlbum: (state, albumId) =>
    state.setIn(['player', 'albumId'], albumId)
}, immutableInitialState)
