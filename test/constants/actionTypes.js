const TYPES = [
  'OPEN_PLAYER',
  'PLAY_ALBUM'
]

export default TYPES.reduce(
  (typesObj, type) => {
    typesObj[type] = Symbol(type)
    return typesObj
  }, {})
