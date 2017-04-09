import { jsdom } from 'jsdom'
import R from 'ramda'

const _document = jsdom(`
<!DOCTYPE html>
  <html>
    <body>
      <div id='react-app'></div>
    </body>
  </html>
`)

const _window = _document.defaultView

global.document = _document
global.window = _window

const setGlobalValue = (key, value = window[key]) => {
  if (!(key in global)) {
    global[key] = value
  }
}

// add window's keys to global
R.compose(
  R.forEach(setGlobalValue),
  R.keys
)(window)
