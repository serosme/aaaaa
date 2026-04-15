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

  handle('conf:asr:get', () => {
    return get('asr')
  })

  handle('conf:asr:set', (_event, conf) => {
    set('asr', conf)
    return true
  })
}
