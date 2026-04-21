import { fileURLToPath } from 'node:url'
import { BrowserWindow, session, WebContentsView } from 'electron'

const chatViews: Record<string, WebContentsView> = {}

export function getChatViews() {
  return chatViews
}

export async function useChat() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#FFFFFF',
      symbolColor: '#000000',
    },
  })

  const BOTTOM_HEIGHT = 80

  // 写死的配置
  const sites = [
    { name: 'qwen', url: 'https://chat.qwen.ai' },
    { name: 'deepseek', url: 'https://chat.deepseek.com' },
    { name: 'chatgpt', url: 'https://chatgpt.com' },
  ]

  async function applyProxy(partition: string) {
    const ses = session.fromPartition(partition)

    await ses.setProxy({
      proxyRules: 'http=127.0.0.1:7890;https=127.0.0.1:7890',
    })
  }
  for (const site of sites) {
    await applyProxy(`persist:${site.name}`)
  }

  // 创建底部视图
  const bottomView = new WebContentsView({
    webPreferences: {
      partition: 'persist:bottom',
      preload: fileURLToPath(new URL('../preload.js', import.meta.url)),
      sandbox: false,
      contextIsolation: true,
    },
  })
  bottomView.webContents.loadURL('http://localhost:3000/chat')
  win.contentView.addChildView(bottomView)
  bottomView.webContents.openDevTools()

  // 创建横向排布的视图
  const views = sites.map((site) => {
    const view = new WebContentsView({
      webPreferences: {
        partition: `persist:${site.name}`,
        preload: fileURLToPath(new URL('../preload.js', import.meta.url)),
        sandbox: false,
        contextIsolation: true,
      },
    })
    view.webContents.loadURL(site.url)
    win.contentView.addChildView(view)
    chatViews[site.name] = view
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
    Object.keys(chatViews).forEach(key => delete chatViews[key])
  })
}
