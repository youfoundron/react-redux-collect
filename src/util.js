import R from 'ramda'

// take the first element of an array
const first = R.nth(0)

// determine if the given path is indicating the wildcard
const isWildcard = R.ifElse(
  Array.isArray,
  R.compose(R.equals('*'), first),
  R.equals('*')
)

// determine if the given path is indicating an action
const isActionPath = R.ifElse(
  Array.isArray,
  R.compose(R.equals('actions', first)),
  R.always(false)
)

// determine if the given propName is the spread symbol
const isSpread = R.equals('...')

// generate a ramda lens given a path
const getLensFromPath = R.ifElse(
  Array.isArray,
  R.lensPath,
  R.lensProp
)

// get a state value given a path and state
const getValueFromPath = R.useWith(R.view, [getLensFromPath, R.identity])

// get a propName given a path
const getPropNameFromPath = R.ifElse(
  Array.isArray,
  R.last,
  R.identity
)

// given a path, return a function to retrieve an actionCreator
const getActionCreatorFactory = R.path(R.slice(1))

export {
  getValueFromPath,
  getPropNameFromPath,
  getActionCreatorFactory,
  isWildcard,
  isActionPath,
  isSpread
}
