import { BrowserWindow, WebContentsView } from 'electron'

export function useChat() {
  // 1. 创建一个基础窗口
  const win = new BrowserWindow({ width: 1280, height: 720 })

  // 2. 创建两个独立的视图
  const leftView = new WebContentsView({
    webPreferences: {
      partition: 'persist:deepseek',
    },
  })
  const rightView = new WebContentsView({
    webPreferences: {
      partition: 'persist:qwen',
    },
  })

  // 3. 让视图加载不同的内容
  leftView.webContents.loadURL('https://chat.deepseek.com')
  rightView.webContents.loadURL('https://chat.qwen.ai')

  // 4. 将视图添加到窗口中
  win.contentView.addChildView(leftView)
  // win.contentView.addChildView(rightView)

  win.loadURL('http://localhost:3000')

  // 5. 定义视图的位置和大小 (例如左右分屏)
  function layout() {
    const bounds = win.getBounds()
    const halfWidth = bounds.width / 2
    leftView.setBounds({ x: 0, y: 0, width: halfWidth, height: bounds.height })
    rightView.setBounds({ x: halfWidth, y: 0, width: halfWidth, height: bounds.height })
  }

  // 监听窗口大小变化，重新布局
  win.on('resize', layout)
  layout() // 初始布局

  // 重要：BaseWindow 不会自动回收子视图资源，需要手动管理，避免内存泄漏[citation:1]
  win.on('closed', () => {
    leftView.webContents.close()
    rightView.webContents.close()
  })

  rightView.webContents.on('did-finish-load', async () => {
    await new Promise(r => setTimeout(r, 2000))

    await rightView.webContents.executeJavaScript(`
      (() => {
          const textarea = document.querySelector('.message-input-textarea')
          if (!textarea) return false

          Object.getOwnPropertyDescriptor(
          HTMLTextAreaElement.prototype,
          'value'
          ).set.call(textarea, '你好，这是测试内容' )

          textarea.dispatchEvent(new Event('input', { bubbles: true }))
          textarea.dispatchEvent(new Event('change', { bubbles: true }))

          const sendButton = document.querySelector('.send-button')
          if (!sendButton) return false
          sendButton.click()

          return true
      })()
    `)
  })
}
