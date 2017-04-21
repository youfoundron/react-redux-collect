import R from 'ramda'
import { isArray } from '../util'

const getValueFromPath = R.ifElse(
  isArray,
  (path, state) => state.getIn(path),
  (path, state) => state.get(path)
)

export { getValueFromPath }
