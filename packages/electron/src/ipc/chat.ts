import { handle } from '../ipc.js'
import { getChatViews } from '../window/chat.js'

export function chatIpc() {
  handle('chat:send', async (_, text: string) => {
    const views = getChatViews()
    for (const view of Object.values(views)) {
      await view.webContents.executeJavaScript(`
        const textarea = document.querySelector('.message-input-textarea')
        if (textarea) {
          Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(textarea, '${text}')
          textarea.dispatchEvent(new Event('input', { bubbles: true }))
          document.querySelector('.send-button')?.click()
        }
      `)
    }
  })
}
