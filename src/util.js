import R from 'ramda'

// take the first element of an array
const first = R.nth(0)

// check if path is an array
const isArray = path => Array.isArray(path)

// determine if the given propName is the spread symbol
const isSpread = R.equals('...')

// determine if the given path is indicating the wildcard
const isWildcard = R.ifElse(
  isArray,
  R.compose(R.equals('*'), first),
  R.equals('*')
)

// determine if the given path is indicating an action
const isActionPath = R.ifElse(
  isArray,
  R.compose(R.equals('actions'), first),
  R.always(false)
)

// given an array of setters, and the same args, merge their results
const mergeSetters = setters => (...args) => R.compose(
  R.mergeAll,
  R.map(setter => setter(...args))
)(setters)

// generate a ramda lens given a path
const getLensFromPath = R.ifElse(
  isArray,
  R.lensPath,
  R.lensProp
)

// get a state value given a path and state
const getValueFromPath = R.useWith(
  R.view,
  [getLensFromPath, R.identity]
)

// get a propName given a path
const getPropNameFromPath = R.ifElse(
  isArray,
  R.last,
  R.identity
)

// given a path, return a function to retrieve an actionCreator
const getActionCreatorFactory = R.compose(
  R.path,
  R.slice(1, Infinity)
)

export {
  isArray,
  isSpread,
  isWildcard,
  isActionPath,
  mergeSetters,
  getValueFromPath,
  getPropNameFromPath,
  getActionCreatorFactory
}
