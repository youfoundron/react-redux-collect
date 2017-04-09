import { fromJS } from 'immutable'

const initialState = {
  id: 'SST-130',
  title: 'You\'re Living All Over Me',
  artist: 'Dinosaur Jr.',
  tracks: [
    { title: 'Little Fury Things', length: '3:06' },
    { title: 'Kracked', length: '2:50' },
    { title: 'Sludgefeast', length: '5:17' },
    { title: 'The Lung', length: '3:51' },
    { title: 'Raisans', length: '3:50' },
    { title: 'Tarpit', length: '4:36' },
    { title: 'In a Jar', length: '3:28' },
    { title: 'Lose', length: '3:11' },
    { title: 'Poledo', length: '5:43' }
  ],
  player: {
    open: false,
    albumId: null
  }
}

export default initialState
export const immutable = fromJS(initialState)
