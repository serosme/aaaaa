import type { RelayConf } from 'shared'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, net, session, WebContentsView } from 'electron'

const PROXY_RULES = 'http=127.0.0.1:7890;https=127.0.0.1:7890'
const BOTTOM_HEIGHT = 80

const chatViews = new Map<string, WebContentsView>()
let relayConf: RelayConf[] = []

function getPartition(name: string) {
  return `persist:${name}`
}

function createView(name: string, url: string, win?: BrowserWindow) {
  const view = new WebContentsView({
    webPreferences: {
      partition: getPartition(name),
      preload: fileURLToPath(new URL('../preload.js', import.meta.url)),
      sandbox: false,
      contextIsolation: true,
    },
  })

  view.webContents.loadURL(url)
  win?.contentView.addChildView(view)

  return view
}

export async function executeJavaScriptForSites(text: string) {
  if (!text) {
    console.warn('executeJavaScriptForSites: text is empty')
    return
  }

  await Promise.allSettled(
    relayConf
      .map(site => [site, chatViews.get(site.name)] as const)
      .filter(([, view]) => view)
      .map(([site, view]) => {
        const script = site.send.replace(/\{\{TEXT_JSON\}\}/g, JSON.stringify(text))

        return view!.webContents.executeJavaScript(script).catch((error) => {
          console.error(`[${site.name}] 执行失败:`, error)
        })
      }),
  )
}

async function applyProxies(sites: RelayConf[]) {
  await Promise.allSettled(
    sites.map(({ name }) =>
      session.fromPartition(getPartition(name))
        .setProxy({ proxyRules: PROXY_RULES })
        .catch(error => console.error(`[${name}] 代理配置失败:`, error)),
    ),
  )
}

async function fetchRelayConf(): Promise<RelayConf[]> {
  try {
    const res = await net.fetch('http://localhost:3000/api/conf/relay')
    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)

    return await res.json() as RelayConf[]
  }
  catch (error) {
    console.error('获取配置失败:', error)
    return []
  }
}

function bindLayout(win: BrowserWindow, views: WebContentsView[], bottomView: WebContentsView) {
  const layout = () => {
    const { width, height } = win.getBounds()
    const mainHeight = height - BOTTOM_HEIGHT
    const viewWidth = width / views.length

    views.forEach((view, i) => {
      view.setBounds({
        x: Math.round(i * viewWidth),
        y: 0,
        width: Math.round(viewWidth),
        height: mainHeight,
      })
    })

    bottomView.setBounds({
      x: 0,
      y: mainHeight,
      width,
      height: BOTTOM_HEIGHT,
    })
  }

  win.on('resize', layout)
  layout()
}

function bindCleanup(win: BrowserWindow, views: WebContentsView[]) {
  win.on('closed', () => {
    views.forEach(view => view.webContents.close())
    chatViews.clear()
  })
}

export async function useChat() {
  relayConf = await fetchRelayConf()

  if (!relayConf.length) {
    console.warn('没有获取到有效的站点配置')
    return
  }

  await applyProxies(relayConf)

  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#FFFFFF',
      symbolColor: '#000000',
    },
    show: false,
  })

  const bottomView = createView('bottom', 'http://localhost:3000/chat', win)

  const views = relayConf.map((site) => {
    const view = createView(site.name, site.url, win)
    chatViews.set(site.name, view)
    return view
  })

  const allViews = [...views, bottomView]

  bindLayout(win, views, bottomView)
  bindCleanup(win, allViews)

  win.show()
}
