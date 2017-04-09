import React from 'react'
import { Provider } from 'react-redux'
import store, { immutable as immutableStore } from '../store'

const makeWrapper = store => props =>
  <Provider store={store}>
    {props.children}
  </Provider>

export default makeWrapper(store)
export const immutable = makeWrapper(immutableStore)
