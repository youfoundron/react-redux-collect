import rootReducer, { immutable as immutableReducer } from './rootReducer'
import initialState, { immutable as immutableState } from './initialState'
import { createStore } from 'redux'

export default createStore(rootReducer, initialState)
export const immutable = createStore(immutableReducer, immutableState)
