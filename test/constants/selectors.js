export const selectFirstTrack = state =>
  state.tracks[0]

export const immutableSelectFirstTrack = state =>
  state.getIn(['tracks', 0])
