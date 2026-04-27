import { handle } from '../ipc.js'
import { useChat } from '../window/relay.js'

export function relayIpc() {
  handle('relay:open', async (_) => {
    await useChat()
  })
}
