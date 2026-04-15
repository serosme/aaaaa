import { get, set } from '../config-store.js'
import { handle } from './index.js'

export function confIpc() {
  handle('conf:music:get', () => {
    return get('music')
  })

  handle('conf:music:set', (_event, conf) => {
    set('music', conf)
    return true
  })
}
