import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import AlbumDetail, { immutable as ImmutableAlbumDetail } from './components/AlbumDetail'
import store, { immutable as immutableStore } from './store'
import Wrapper, { immutable as ImmutableWrapper } from './Wrapper'

chai.use(chaiEnzyme())

const app = mount(
  <Wrapper>
    <AlbumDetail />
  </Wrapper>
)

const immutableApp = mount(
  <ImmutableWrapper>
    <ImmutableAlbumDetail />
  </ImmutableWrapper>
)

const connectedComponent = app.find(AlbumDetail).first()
const immutableConnectedComponent = immutableApp.find(AlbumDetail).first()

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
    expect(connectedComponent).to.have.props([
      'id',
      'title',
      'band',
      'firstTrack',
      'numTracks',
      'onHover',
      'onClick'
    ])
  })

  describe('#syntax', () => {
    it('should support <path> as a string', () => {
      expect(connectedComponent).to.have.prop('id').equal(store.getState().id)
    })

    it('should support <path> as a single-item array', () => {
      expect(connectedComponent).to.have.prop('title').equal(store.getState().title)
    })

    it('should support <name>', () => {
      expect(connectedComponent).to.have.prop('band').equal(store.getState().artist)
    })

    it('should support <path> as a multiple-item array', () => {
      expect(connectedComponent).to.have.prop('firstTrack').equal(store.getState().tracks[0])
    })

    it('should support <transformer> for state values', () => {
      expect(connectedComponent).to.have.prop('numTracks').equal(store.getState().tracks.length)
    })

    it('should support <path> for actions', () => {
      expect(connectedComponent).to.have.prop('onHover').be.a('function')
      connectedComponent.node.props.onHover()
      expect(store.getState().player.open).to.be.true
    })

    it('should support <transformer> for actions', () => {
      expect(connectedComponent).to.have.prop('onClick').be.a('function')
      connectedComponent.node.props.onClick()
      expect(store.getState().player.albumId).to.equal(connectedComponent.node.props.id)
    })
  })
})

// describe('react-redux-collect/immutable', () => {
//
// })
