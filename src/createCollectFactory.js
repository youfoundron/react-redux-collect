import R from 'ramda'
import { connect } from 'react-redux'

export default ({
  isArray,
  isSpread,
  isWildcard,
  isActionPath,
  getValueFromPath,
  getPropNameFromPath,
  getActionCreatorFactory
}) => actionCreators => (...args) => {
  // declare empty setters arrays
  const propSetters = []
  const actionSetters = []

  // derive propArgs from shape of args
  for (let propArgs of args.length ? args[0] : [args]) {
    const [
      path,
      propName = getPropNameFromPath(path),
      transformer = R.identity
    ] = isArray(propArgs) ? propArgs : [propArgs]

    // handle wildcard path
    if (isWildcard(path)) {
      propSetters.push((state, ownProps) => {
        const value = transformer(state, state, ownProps)
        return isWildcard(propName) ? { ...value } : { [propName]: value }
      })
      continue
    }

    // handle action path
    if (isActionPath(path)) {
      const actionCreator = getActionCreatorFactory(path)(actionCreators)
      actionSetters.push((dispatch, ownProps) => {
        const value = R.compose(dispatch, transformer(actionCreator, ownProps))
        return { [propName]: value }
      })
      continue
    }

    // handle regular prop
    propSetters.push((state, ownProps) => {
      const value = transformer(getValueFromPath(path, state), state, ownProps)
      // spread the value into state or return a named prop
      return isSpread(propName) ? { ...value } : { [propName]: value }
    })
  }

  const mapStateToProps = (state, props) => {
    const result = R.mergeAll(
      propSetters.map(propSetter =>
        propSetter(state, props)
      )
    )
    return result
  }
  const mapDispatchToProps = (dispatch, props) => {
    const result = R.mergeAll(
      actionSetters.map(actionSetter =>
        actionSetter(dispatch, props)
      )
    )
    return result
  }

  return connect(mapStateToProps, mapDispatchToProps)
}
