import React from 'react'

import collect from '../../src'
import immutableCollect from '../../src/immutable'
import TrackDetail from '../components/TrackDetail'
import {
  selectFirstTrack,
  immutableSelectFirstTrack
} from '../constants/selectors'

const FirstTrack = collect(
  [selectFirstTrack, '...']
)(TrackDetail)

const ImmutableFirstTrack = immutableCollect(
  [immutableSelectFirstTrack, '...']
)(TrackDetail)

export default FirstTrack
export const immutable = ImmutableFirstTrack
