import { BrowserWindow, WebContentsView } from 'electron'

export function useChat() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: 'hidden',
  })

  const relayHeight = 80

  // 创建视图
  const views = {
    left: new WebContentsView({ webPreferences: { partition: 'persist:deepseek' } }),
    right: new WebContentsView({ webPreferences: { partition: 'persist:qwen' } }),
    relay: new WebContentsView({ webPreferences: { partition: 'persist:deepseek' } }),
  }

  // 加载URL
  views.left.webContents.loadURL('https://chat.deepseek.com')
  views.right.webContents.loadURL('https://chat.qwen.ai')
  views.relay.webContents.loadURL('http://localhost:3000/test')

  // 添加到窗口
  Object.values(views).forEach(view => win.contentView.addChildView(view))

  // 布局
  const layout = () => {
    const { width, height } = win.getBounds()
    const halfWidth = width / 2

    views.left.setBounds({ x: 0, y: 0, width: halfWidth, height: height - relayHeight })
    views.right.setBounds({ x: halfWidth, y: 0, width: halfWidth, height: height - relayHeight })
    views.relay.setBounds({ x: 0, y: height - relayHeight, width, height: relayHeight })
  }

  win.on('resize', layout)
  layout()

  // 自动发送测试消息
  views.right.webContents.on('did-finish-load', async () => {
    await new Promise(r => setTimeout(r, 2000))

    await views.right.webContents.executeJavaScript(`
      const textarea = document.querySelector('.message-input-textarea')
      if (textarea) {
        Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(textarea, '你好，这是测试内容')
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
        document.querySelector('.send-button')?.click()
      }
    `)
  })

  // 清理资源
  win.on('closed', () => {
    Object.values(views).forEach(view => view.webContents.close())
  })
}
