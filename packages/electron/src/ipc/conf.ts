import { handle } from '../ipc.js'
import { get, set } from '../utils/config-store.js'

export function confIpc() {
  handle('conf:music:get', () => {
    return get('music')
  })

  handle('conf:music:set', (_event, conf) => {
    set('music', conf)
    return true
  })
}
