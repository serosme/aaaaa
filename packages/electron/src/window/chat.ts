import type { RelayConf } from 'shared'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, net, session, WebContentsView } from 'electron'

const PROXY_RULES = 'http=127.0.0.1:7890;https=127.0.0.1:7890'
const BOTTOM_HEIGHT = 80
const DEFAULT_WINDOW_SIZE = { width: 1600, height: 900 }

const chatViews: Map<string, WebContentsView> = new Map()
let relayConf: RelayConf[] = []

// 执行 JavaScript 脚本
export async function executeJavaScriptForSites(text: string) {
  if (!text) {
    console.warn('executeJavaScriptForSites: text is empty')
    return
  }

  const promises = relayConf
    .filter(site => chatViews.has(site.name))
    .map((site) => {
      const chatView = chatViews.get(site.name)!
      const script = site.send.replace(/\{\{TEXT\}\}/g, text)
      return chatView.webContents.executeJavaScript(script)
        .catch((error) => {
          console.error(`[${site.name}] 执行失败:`, error)
        })
    })

  if (promises.length > 0) {
    await Promise.allSettled(promises)
  }
}

// 应用代理配置（并行执行）
async function applyProxies(sites: RelayConf[]) {
  const proxyPromises = sites.map(site =>
    session.fromPartition(`persist:${site.name}`).setProxy({ proxyRules: PROXY_RULES }).catch(error => console.error(`[${site.name}] 代理配置失败:`, error)),
  )

  await Promise.allSettled(proxyPromises)
}

// 创建 WebContentsView
function createWebContentsView(partition: string, url: string) {
  const view = new WebContentsView({
    webPreferences: {
      partition: `persist:${partition}`,
      preload: fileURLToPath(new URL('../preload.js', import.meta.url)),
      sandbox: false,
      contextIsolation: true,
    },
  })
  view.webContents.loadURL(url)
  return view
}

// 获取配置
async function fetchRelayConf(): Promise<RelayConf[]> {
  try {
    const response = await net.fetch('http://localhost:3000/api/conf/relay')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json() as RelayConf[]
  }
  catch (error) {
    console.error('获取配置失败:', error)
    return []
  }
}

// 布局管理
function createLayoutManager(win: BrowserWindow, views: WebContentsView[], bottomView: WebContentsView) {
  const updateLayout = () => {
    const { width, height } = win.getBounds()
    const viewCount = views.length

    if (viewCount === 0)
      return

    const viewWidth = width / viewCount

    views.forEach((view, index) => {
      view.setBounds({
        x: index * viewWidth,
        y: 0,
        width: viewWidth,
        height: height - BOTTOM_HEIGHT,
      })
    })

    bottomView.setBounds({
      x: 0,
      y: height - BOTTOM_HEIGHT,
      width,
      height: BOTTOM_HEIGHT,
    })
  }

  win.on('resize', updateLayout)
  return updateLayout
}

// 清理资源
function cleanup(win: BrowserWindow, views: WebContentsView[], bottomView: WebContentsView) {
  win.on('closed', () => {
    bottomView.webContents.close()
    views.forEach(view => view.webContents.close())
    chatViews.clear()
  })
}

// 主函数
export async function useChat() {
  // 获取配置
  relayConf = await fetchRelayConf()

  if (relayConf.length === 0) {
    console.warn('没有获取到有效的站点配置')
    return
  }

  // 创建窗口
  const win = new BrowserWindow({
    ...DEFAULT_WINDOW_SIZE,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#FFFFFF',
      symbolColor: '#000000',
    },
    show: false, // 先隐藏，布局完成后再显示
  })

  // 并行应用代理
  await applyProxies(relayConf)

  // 创建底部视图
  const bottomView = createWebContentsView('bottom', 'http://localhost:3000/chat')
  win.contentView.addChildView(bottomView)
  bottomView.webContents.openDevTools()

  // 创建聊天视图
  const views = relayConf.map((site) => {
    const view = createWebContentsView(site.name, site.url)
    win.contentView.addChildView(view)
    view.webContents.openDevTools()
    chatViews.set(site.name, view)
    return view
  })

  // 布局管理
  const layout = createLayoutManager(win, views, bottomView)
  layout()

  // 清理资源
  cleanup(win, views, bottomView)

  // 显示窗口
  win.show()
}
