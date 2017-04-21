import { getValueFromPath } from './util'
import createCollectFactory from './createCollectFactory'

const createCollect = createCollectFactory(getValueFromPath)

export default createCollect()
export { createCollect }
