/* eslint-disable */

import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { Provider } from 'react-redux'

import AlbumDetail from './components/AlbumDetail'
import TrackDetail from './components/TrackDetail'
import AlbumDetailContainer, { immutable as ImmutableAlbumDetailContainer } from './containers/AlbumDetailContainer'
import FirstTrack, { immutable as ImmutableFirstTrack } from './containers/FirstTrack'
import store, { immutable as immutableStore } from './store'

chai.use(chaiEnzyme())

const wrapper = mount(
  <Provider store={store}>
    <div>
      <AlbumDetailContainer id={store.getState().id} />
      <FirstTrack />
    </div>
  </Provider>
)

const immutableWrapper = mount(
  <Provider store={immutableStore}>
    <div>
      <ImmutableAlbumDetailContainer id={immutableStore.getState().get('id')} />
      <ImmutableFirstTrack />
    </div>
  </Provider>
)

const _AlbumDetail = wrapper.find(AlbumDetail).first()
const immutableConnectedComponent = immutableWrapper.find(AlbumDetail).first()

describe('jsDOM', () => {
  describe('#window', () => {
    it('should exist in global scope', () => {
      expect(window).to.exist
    })

    it('should be merged into global scope', () => {
      const windowKeys = Object.keys(window)
      expect(global).to.have.any.keys(windowKeys)
    })
  })

  describe('#document', () => {
    it('should exist in global scope', () => {
      expect(document).to.exist
    })

    it('should be queryable', () => {
      const e = document.getElementById('react-app')
      expect(e).to.exist
    })
  })
})

describe('react-redux-collect', () => {
  it('should connect expected props', () => {
    expect(_AlbumDetail).to.have.props([
      'id',
      'title',
      'band',
      'firstTrack',
      'numTracks',
      'openPlayer',
      'onClick'
    ])
  })

  describe('#syntax', () => {
    it('should support <path> as a string', () => {
      expect(_AlbumDetail).to.have.prop('id').equal(store.getState().id)
    })

    it('should support <path> as a single-item array', () => {
      expect(_AlbumDetail).to.have.prop('title').equal(store.getState().title)
    })

    it('should support <name>', () => {
      expect(_AlbumDetail).to.have.prop('band').equal(store.getState().artist)
    })

    it('should support <path> as a multiple-item array', () => {
      expect(_AlbumDetail).to.have.prop('firstTrack').equal(store.getState().tracks[0])
    })

    it('should support <transformer> for state values', () => {
      expect(_AlbumDetail).to.have.prop('numTracks').equal(store.getState().tracks.length)
    })

    it('should support <path> for actions', () => {
      expect(_AlbumDetail).to.have.prop('openPlayer').be.a('function')
      _AlbumDetail.node.props.openPlayer()
      expect(store.getState().player.open).to.be.true
    })

    it('should support <transformer> for actions', () => {
      expect(_AlbumDetail).to.have.prop('onClick').be.a('function')
      _AlbumDetail.node.props.onClick()
      expect(store.getState().player.albumId).to.equal(_AlbumDetail.node.props.id)
    })
  })
})

describe('react-redux-collect/immutable', () => {
  it('should connect expected props', () => {
    expect(_AlbumDetail).to.have.props([
      'id',
      'title',
      'band',
      'firstTrack',
      'numTracks',
      'openPlayer',
      'onClick'
    ])
  })

  describe('#syntax', () => {
    it('should support <path> as a string', () => {
      expect(immutableConnectedComponent).to.have.prop('id').equal(immutableStore.getState().get('id'))
    })

    it('should support <path> as a single-item array', () => {
      expect(immutableConnectedComponent).to.have.prop('title').equal(immutableStore.getState().get('title'))
    })

    it('should support <name>', () => {
      expect(immutableConnectedComponent).to.have.prop('band').equal(immutableStore.getState().get('artist'))
    })

    it('should support <path> as a multiple-item array', () => {
      expect(immutableConnectedComponent).to.have.prop('firstTrack').equal(immutableStore.getState().getIn(['tracks', 0]))
    })

    it('should support <transformer> for state values', () => {
      expect(immutableConnectedComponent).to.have.prop('numTracks').equal(immutableStore.getState().get('tracks').size)
    })

    it('should support <path> for actions', () => {
      expect(immutableConnectedComponent).to.have.prop('openPlayer').be.a('function')
      immutableConnectedComponent.node.props.openPlayer()
      expect(immutableStore.getState().getIn(['player', 'open'])).to.be.true
    })

    it('should support <transformer> for actions', () => {
      expect(immutableConnectedComponent).to.have.prop('onClick').be.a('function')
      immutableConnectedComponent.node.props.onClick()
      expect(immutableStore.getState().getIn(['player', 'albumId'])).to.equal(immutableConnectedComponent.node.props.id)
    })
  })
})
