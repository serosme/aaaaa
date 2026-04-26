import type { RelayConf } from 'shared'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, net, session, WebContentsView } from 'electron'

const chatViews: Record<string, WebContentsView> = {}
let relayConf: RelayConf[] = []

export async function executeJavaScriptForSites(text: string) {
  const promises = []

  for (const site of relayConf) {
    const chatView = chatViews[site.name]
    if (chatView) {
      const script = site.send.replace(/\{\{TEXT\}\}/g, text)
      promises.push(chatView.webContents.executeJavaScript(script))
    }
  }

  await Promise.all(promises)
}

export async function useChat() {
  // 获取配置
  const response = await net.fetch('http://localhost:3000/api/conf/relay')
  relayConf = response.ok ? await response.json() as RelayConf[] : []

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

  async function applyProxy(partition: string) {
    const ses = session.fromPartition(partition)

    await ses.setProxy({
      proxyRules: 'http=127.0.0.1:7890;https=127.0.0.1:7890',
    })
  }
  for (const site of relayConf) {
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
  const views = relayConf.map((site) => {
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
