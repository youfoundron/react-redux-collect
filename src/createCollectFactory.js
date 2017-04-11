import R from 'ramda'
import { connect } from 'react-redux'

export default ({
  getValueFromPath,
  getPropNameFromPath,
  getActionCreatorFactory,
  isWildcard,
  isActionPath,
  isSpread
}) => actionCreators => (...args) => {
  const propSetters = []
  const actionSetters = []

  // make args shallow
  if (args.length > 1) {
    args = [args]
  }

  for (let [
    path,
    propName = getPropNameFromPath(path),
    transformer = R.identity
  ] of args) {
    // handle wildcard path
    if (isWildcard(path)) {
      propSetters.push((state, props) => {
        const value = transformer(state, state, props)
        return R.isWildcard(propName) ? { ...value } : { [propName]: value }
      })
      continue
    }

    // handle action path
    if (isActionPath(path)) {
      actionSetters.push((dispatch, props) => {
        const actionCreator = getActionCreatorFactory(path)(actionCreators)
        const value = R.compose(dispatch, transformer(actionCreator, props))
        return { [propName]: value }
      })
      continue
    }

    // handle regular prop
    propSetters.push((state, props) => {
      const value = transformer(getValueFromPath(path, state), state, props)
      // spread the value into state or return a named prop
      return isSpread(propName) ? { ...value } : { [propName]: value }
    })
  }

  const mapStateToProps = R.converge(R.mergeAll, propSetters)
  const mapDispatchToProps = R.converge(R.mergeAll, actionSetters)

  return connect(mapStateToProps, mapDispatchToProps)
}
