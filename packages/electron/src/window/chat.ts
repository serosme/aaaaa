import { BrowserWindow, WebContentsView } from 'electron'

export function useChat() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    titleBarStyle: 'hidden',
  })

  const BOTTOM_HEIGHT = 80

  // 写死的配置
  const sites = [
    { name: 'qwen', url: 'https://chat.qwen.ai' },
    { name: 'deepseek', url: 'https://chat.deepseek.com' },
  ]

  // 创建底部视图
  const bottomView = new WebContentsView({
    webPreferences: { partition: 'persist:bottom' },
  })
  bottomView.webContents.loadURL('http://localhost:3000/test')
  win.contentView.addChildView(bottomView)

  // 创建横向排布的视图
  const views = sites.map((site) => {
    const view = new WebContentsView({
      webPreferences: { partition: `persist:${site.name}` },
    })
    view.webContents.loadURL(site.url)
    win.contentView.addChildView(view)
    return view
  })

  const layout = () => {
    const { width, height } = win.getBounds()
    const viewCount = views.length
    const viewWidth = width / viewCount

    // 横向排布
    views.forEach((view, index) => {
      view.setBounds({
        x: index * viewWidth,
        y: 0,
        width: viewWidth,
        height: height - BOTTOM_HEIGHT,
      })
    })

    // 底部视图
    bottomView.setBounds({
      x: 0,
      y: height - BOTTOM_HEIGHT,
      width,
      height: BOTTOM_HEIGHT,
    })
  }

  win.on('resize', layout)
  layout()
  win.show()

  // 清理资源
  win.on('closed', () => {
    bottomView.webContents.close()
    views.forEach(view => view.webContents.close())
  })
}
