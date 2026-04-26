import { handle } from '../ipc.js'
import { executeJavaScriptForSites } from '../window/chat.js'

export function chatIpc() {
  handle('chat:send', async (_, text: string) => {
    executeJavaScriptForSites(text)
  })
}
