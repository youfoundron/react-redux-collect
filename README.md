# React Redux Collect
This is the consequence of some feedback and meditation on [react-redux-connect-helpers](https://github.com/rongierlach/react-redux-connect-helpers).  
Chiefly, the resulting nested mess of connectors after composition:

![screen shot 2017-04-08 at 3 01 55 pm](https://cloud.githubusercontent.com/assets/4658359/24832048/0342a57a-1c6d-11e7-8462-aab689054e54.png)  
*screenshot from [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)*

This function implements the same core functionality as react-redux-connect-helper's `connectStateValue`, but by buildling up `mapStateToProps` and `mapDispatchToProps` arguments to be passed to a _single_ [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) call.

## Usage

Where the shape of `state` and `actionCreators` look like this:
```javascript
const state = {
  id: 'SST-130',
  title: 'You\'re Living All Over Me',
  artist: 'Dinosaur Jr.',
  tracks: [
    { title: 'Little Fury Things', length: '3:06' },
    { title: 'Kracked', length: '2:50' }
    { title: 'Sludgefeast', length: '5:17' }
    { title: 'The Lung', length: '3:51' }
    { title: 'Raisans', length: '3:50' }
    { title: 'Tarpit', length: '4:36' }
    { title: 'In a Jar', length: '3:28' }
    { title: 'Lose', length: '3:11' }
    { title: 'Poledo', length: '5:43' }
  ]
}

const actionCreators = {
  openPlayer: () => ({
    type: 'OPEN_PLAYER'
  }),
  playAlbum: albumId => ({
    type: 'PLAY_ALBUM',
    payload: albumId
  })
}
```
This code:
```javascript
import { createCollect } from 'react-redux-collect'
import actionCreators from './actionCreators'

// This is only necessary if you intend to connect actions as props.
// Otherwise you can just use the default export.
const collect = createCollect(actionCreators)

// NOTE:
// Ideally a created collect is declared in another file
// and imported as needed throughout your application.

const provideProps = collect([
  // access state.id, connect as 'id' prop
  'id',
  // same as above, access state.title, connect as 'title' prop
  ['title']
  // access state.artist, connect as 'band' prop
  ['artist', 'band'],
  // access state.tracks[0], connect as 'firstTrack' prop
  [['tracks', 0], 'firstTrack'],
  // access tracks, pass through selector, connect as 'numTracks' prop
  ['tracks', 'numTracks', (tracks, state) => tracks.length],
  // access openPlayer action, connect as 'openPlayer' prop
  [['actions', 'openPlayer']],
  // access playAlbum action, transform the result, connect as 'onClick' prop
  [['actions', 'playAlbum'], 'onClick', (playAlbum, props) => playAlbum.bind(props.id)]
])
// NOTE:
// If state.actions is not undefined, collect will throw an error
```
Is equivalent to:
```javascript
import { connect } from 'react-redux'
import actionCreators from './actionCreators'

const mapStateToProps = state => ({
  title: state.title,
  band: state.artist,
  firstTrack: state.tracks[0],
  numTracks: state.tracks.length
})

const mapDispatchToProps = (dispatch, props) => ({
  openPlayer: (...args) =>
    dispatch(actionCreators.openPlayer(...args)),
  onClick: (...args) =>
    dispatch(actionCreators.playAlbum(props.id, ...args))
})

const provideProps = connect(
  mapStateToProps,
  mapDispatchToProps
)
```
