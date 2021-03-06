# React Redux Collect
[![Build Status](https://travis-ci.org/rongierlach/react-redux-collect.svg?branch=master)](https://travis-ci.org/rongierlach/react-redux-collect)  [![Coverage Status](https://coveralls.io/repos/github/rongierlach/react-redux-collect/badge.svg?branch=master)](https://coveralls.io/github/rongierlach/react-redux-collect?branch=master) [![Dependency Status](https://david-dm.org/rongierlach/react-redux-collect.svg)](https://david-dm.org/rongierlach/react-redux-collect) [![devDependency Status](https://david-dm.org/rongierlach/react-redux-collect/dev-status.svg)](https://david-dm.org/rongierlach/react-redux-collect#info=devDependencies) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  

This is the consequence of some feedback and meditation on [react-redux-connect-helpers](https://github.com/rongierlach/react-redux-connect-helpers).  
Chiefly, the resulting nested mess of connectors after composition:

![screen shot 2017-04-08 at 3 01 55 pm](https://cloud.githubusercontent.com/assets/4658359/24832048/0342a57a-1c6d-11e7-8462-aab689054e54.png)  
*screenshot from [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)*

This function implements the same core functionality as react-redux-connect-helper's `connectStateValue`, but by building up `mapStateToProps` and `mapDispatchToProps` arguments to be passed to a _single_ [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) call.  

Collect some values in state and connect them as props. :+1:

## Installation
`$ npm install react-redux-collect`

## Usage
```javascript
import collect from 'react-redux-collect'

const provideProps = collect([<path>, <name>, <transformer>], ...)
```  

The arguments to connect a value in state are ordered as follows:
* `path`: An array or string denoting the key(s) to access the value in state.
* `name` (optional): The key of the resulting prop, defaults to the last key in `path`.
* `transformer` (optional): Function to transform the accessed value or action.  
For values, will pass the value as the first param and state as the second.  
For actions, will pass the action as the first param and props as the second.

For example, where `state` and `actionCreators` look like this:
```javascript
const state = {
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

const collect = createCollect(actionCreators)

const provideProps = collect(
  'id',
  ['title']
  ['artist', 'band'],
  [['tracks', 0], 'firstTrack'],
  ['tracks', 'numTracks', tracks => tracks.length],
  [['actions', 'openPlayer']],
  [['actions', 'playAlbum'], 'onClick', (action, {id}) => action.bind(null, id)]
)
```
Is equivalent to:
```javascript
import { connect } from 'react-redux'
import actionCreators from './actionCreators'

const mapStateToProps = (state, ownProps) => ({
  id: state.id,
  title: state.title,
  band: state.artist,
  firstTrack: state.tracks[0],
  numTracks: state.tracks.length
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  openPlayer: (...args) =>
    dispatch(actionCreators.openPlayer(...args)),
  onClick: (...args) =>
    dispatch(actionCreators.playAlbum(ownProps.id, ...args))
})

const provideProps = connect(
  mapStateToProps,
  mapDispatchToProps
)
```

## Immutable
If your state uses <a href="https://facebook.github.io/immutable-js/">Immutable.js</a>, import with `react-redux-collect/immutable`.

## Tricks

Creating `collect` is only necessary if you intend to connect actions as props.  
Otherwise you can just use the default export.
```javascript
import collect from 'react-redux-collect'

// Ideally a created collect is declared in another file
// and imported as needed throughout your application.
```

You can pass selector functions instead of path arrays.
```javascript
import collect from 'react-redux-collect'

const selectFirstTrack = state => state.tracks[0]

// props: { firstTrack: { title: 'Little Fury Things', length: '3:06' } }
const provideProps = collect([selectFirstTrack, 'firstTrack'])
```

You can spread a state value into props using the string `'...'`.
```javascript
import collect from 'react-redux-collect'

// props: { title: 'Kracked', length: '2:50' }
const provideProps = collect([['tracks', 1], '...'])
```

You can pass the entirety of state into props using the string `'*'`.
```javascript
import collect from 'react-redux-collect'

// props: {...state}
const provideProps = collect('*')
// NOTE:
// If state['*'] is not undefined, collect will throw an error
```
