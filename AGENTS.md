# AGENTS.md

## 项目结构

基于 npm workspaces 的 Electron + Nuxt 4 单体仓库：

- `packages/renderer` - Nuxt 4 前端（Vue 3、Nuxt UI 4、Tailwind CSS 4、@iconify-json/lucide 图标）
- `packages/electron` - Electron 主进程（TypeScript、electron-builder 打包、conf 配置存储）
- `packages/shared` - 类型定义包（IPC 通道、ElectronAPI、类型接口，无具体实现）

## 包功能

### packages/electron - 主进程

- **应用入口**：`main.ts` 初始化托盘、全局快捷键（Alt+Space）、注册 IPC 处理器、启动渲染进程
- **窗口管理**：
  - `command.ts` - 命令面板窗口（浮动、skipTaskbar、Alt+Space 切换、失焦隐藏）
  - `home.ts` - 通用窗口创建/关闭（支持路由参数，生产环境注入 hash 参数）
  - `relay.ts` - 中继聊天窗口（WebContentsView 多站点、独立 partition、代理配置、JS 注入）
- **IPC 处理**：`path:folder:select`（目录选择对话框）、`window:create`/`window:close`（窗口管理）、`relay:open`/`relay:send`（中继聊天）
- **系统托盘**：`tray/index.ts` 托盘图标与菜单
- **窗口工具**：`utils/window.ts`（`startRendererProcess` 等待 Nuxt 启动、`loadURL` 加载页面、`openDevTools`）
- **preload**：`preload.ts` 通过 `contextBridge` 暴露类型化 `electronAPI`

### packages/renderer - 渲染进程

- **页面**：
  - `index.vue` - 命令面板（UCommandPalette 搜索 Pages 和系统应用）
  - `chat/index.vue` - 中继聊天底部输入栏（UChatPrompt → electron.relay.send）
  - `music/index.vue` - 音乐播放器（歌曲列表表格 + 底部播放控制条）
  - `setting/index.vue` - 设置首页（占位卡片）
  - `setting/music.vue` - 音乐设置（配置音乐目录路径）
  - `setting/asr.vue` - 语音识别设置（配置 BigASR API Key）
  - `setting/relay.vue` - 中继聊天站点设置
  - `test/index.vue` - 组件测试页（UTable 示例）
- **布局**：`default.vue`（全屏布局）、`setting.vue`（侧边栏设置布局）
- **Composables**：
  - `useApp()` - 应用列表与启动
  - `useConf(key)` - 响应式配置 CRUD（`load`/`save`）
  - `useMusic()` - 音乐播放核心逻辑（`useMediaControls` 播放控制、切歌、播放列表）
  - `useSpeechRecognition()` - MediaRecorder 录音与 Base64 编码
  - `useSpeechRecognitionToast()` - 语音识别状态 Toast 管理（`add` 显示录音中、`update` 更新识别结果、`remove` 自动消除）
- **Server API**：应用管理（`/api/app`）、配置读写（`/api/conf/[key]`）、语音识别代理（`/api/asr`）、音乐流式播放（`/api/music`，支持 HTTP range）
- **工具**：`base64url.ts` 编码/解码、`electron.ts` 类型化 `window.electronAPI` 包装

### packages/shared - 共享类型

- **IPC 类型**：`IPCChannels`（通道定义）、`ElectronAPI`（preload 暴露接口）
- **配置类型**：`StoreSchema`（asr、music、relay）、`AsrConf`、`MusicConf`、`RelayConf`
- **配置 Schema**：`schema` 对象（供 `conf` 包使用，含默认值）
- **业务类型**：`Music`（index、title、artist、base64url、duration）

## 命令

```bash
npm run dev          # 同时启动渲染进程和 Electron 主进程（concurrently）
npm run preview      # 预览构建后的应用（packages/electron）
npm run build        # 构建渲染进程 + 编译 Electron + 打包（packages/electron）
npm run lint         # ESLint 检查（@antfu/eslint-config）
npm run lint:fix     # 自动修复 lint 问题
```

## 关键说明

- **构建顺序**：`npm run build` 会先构建渲染进程到 `packages/renderer/.output/public`，再编译 Electron 到 `packages/electron/dist`，最后打包到 `packages/electron/release`
- **全局快捷键**：`Alt+Space` 切换命令面板显示/隐藏，窗口失焦自动隐藏
- **路由**：Nuxt 4 `app/` 目录文件系统路由（`app/pages/`）
- **布局系统**：Nuxt 布局（`app/layouts/`），包含 `default.vue` 和 `setting.vue`
- **系统托盘**：`packages/electron/src/tray/` 实现托盘菜单
- **应用管理**（Server API）：
  - `packages/renderer/server/api/app/` - 应用列表与启动 API（`index.get.ts`、`[base64url].get.ts`）
  - `packages/renderer/app/composables/useApp.ts` - 应用 composable（`useApp()`）
  - `packages/renderer/shared/utils/base64url.ts` - base64url 编码/解码工具
- **配置管理**：
  - `packages/renderer/server/api/conf/` - 配置 GET/POST API（`[key].get.ts`、`[key].post.ts`）
  - `packages/renderer/app/composables/useConf.ts` - 响应式配置 CRUD composable（`useConf(key)`）
  - `packages/renderer/server/utils/conf.ts` - 服务端 Conf 实例（存储到 `~/.config/tools`）
  - 使用 `conf` 包（非 electron-store）存储配置（`MusicConf`、`AsrConf`、`RelayConf`）
- **语音识别**：
  - `packages/renderer/server/api/asr.post.ts` - 字节跳动 BigASR API 代理
  - `packages/renderer/app/composables/useSpeechRecognition.ts` - MediaRecorder 语音识别
  - `packages/renderer/app/composables/useSpeechRecognitionToast.ts` - 语音识别 Toast 管理
- **音乐管理**：
  - `packages/renderer/server/api/music/` - 音乐文件列表与流式播放（`index.get.ts`、`[id].get.ts`，支持 HTTP range）
- **中继聊天**（Relay）：
  - `packages/electron/src/window/relay.ts` - 多站点中继窗口（WebContentsView、代理配置、JS 注入）
  - `packages/electron/src/ipc/relay.ts` - `relay:open` / `relay:send` IPC 处理
  - `packages/shared/src/conf/relay.ts` - RelayConf 类型（name、url、send）
  - `packages/renderer/app/pages/chat/index.vue` - 中继聊天输入页
- **窗口管理**：
  - `packages/electron/src/window/command.ts` - 命令面板窗口（Alt+Space 切换、失焦隐藏、skipTaskbar）
  - `packages/electron/src/window/home.ts` - 通用窗口创建（支持路由跳转）
  - `packages/electron/src/window/relay.ts` - 中继聊天窗口（WebContentsView 多站点）
  - `packages/electron/src/utils/window.ts` - 窗口工具函数（`startRendererProcess`、`loadURL`、`openDevTools`）
- **输出目录**：`packages/*/dist/` 为编译输出，`packages/renderer/.output/` 为 Nuxt 构建输出，`packages/electron/release/` 为打包输出（Windows zip）
- **样式**：Tailwind CSS 4 + Nuxt UI，CSS 入口 `app/assets/css/main.css`，VSCode 中 CSS 文件关联为 `tailwindcss` 语言

## 包间协作

### IPC 类型驱动架构

IPC 通信采用类型驱动设计，三端共享同一份类型定义，实现端到端类型安全。每个通道在 `shared/src/ipc/` 中定义两个接口：`*IPCChannels` 描述通道契约（`args`/`return`），`*ElectronAPI` 描述渲染进程调用接口。`index.ts` 通过交叉类型组合所有通道为 `IPCChannels` 和 `ElectronAPI`。

**主进程注册 handler**：`packages/electron/src/ipc.ts` 提供 `handle()` 辅助函数，基于 `IPCChannels` 类型约束 channel 名称和 handler 参数/返回值。各模块（`path.ts`、`window.ts`、`relay.ts`）调用 `handle()` 注册具体逻辑，在 `main.ts` 中统一初始化。

**Preload 桥接**：`packages/electron/src/preload.ts` 提供 `invoke()` 辅助函数，基于 `IPCChannels` 类型约束 channel 和参数。构造 `ElectronAPI` 对象，通过 `contextBridge.exposeInMainWorld` 暴露为 `window.electronAPI`。

**渲染进程调用**：`packages/renderer/app/utils/electron.ts` 包装 `window.electronAPI` 为类型化的 `electron` 对象。`packages/renderer/app/types/electron.d.ts` 通过 `declare global` 扩展 `Window` 接口。

### 配置管理（非 IPC，通过 Server API）

配置读写不走 IPC，而是渲染进程通过 `$fetch` 调用 Nitro Server API（`/api/conf/[key]` GET/POST），服务端使用 `conf` 包读写 `~/.config/tools/config.json`，`useConf(key)` composable 提供响应式 CRUD 接口。

### IPC 通道定义与使用

每个 IPC 通道在 `packages/shared/src/ipc/` 中定义两个接口：`*IPCChannels` 描述通道契约（args/return），`*ElectronAPI` 描述渲染进程调用接口。目前有 path、window、relay 三个通道分类。

`index.ts` 通过交叉类型组合所有通道为 `IPCChannels` 和 `ElectronAPI`。主进程通过 `handle()` 注册 handler，preload 通过 `invoke()` 桥接，渲染进程通过 `electron` 对象调用。

### 配置管理

配置读写不走 IPC，而是渲染进程通过 `$fetch` 调用 Nitro Server API（`/api/conf/[key]` GET/POST），服务端使用 `conf` 包读写 `~/.config/tools/config.json`，`useConf(key)` composable 提供响应式 CRUD 接口。

### 类型定义

- `packages/renderer/shared/types/` - Nuxt 本地类型定义（`application.ts`、`music.ts`）
- `packages/shared/src/conf/` - 配置类型定义（`relay.ts`、`index.ts`）
- `packages/shared/src/store.ts` - Store 类型定义（`StoreSchema`：asr、music、relay）
- `packages/shared/src/ipc/index.ts` - `IPCChannels` 与 `ElectronAPI` 接口组合定义
- `packages/renderer/shared/types/` - Nuxt 本地类型定义（`application.ts`）
- `packages/renderer/app/types/electron.d.ts` - 全局 `Window.electronAPI` 类型扩展
- `packages/renderer/app/utils/electron.ts` - `window.electronAPI` 类型化包装

## Nuxt 模块

- `@nuxt/ui` - Nuxt UI 4 组件库
- `@nuxt/image` - 图片优化
- `@nuxt/icon` - 图标系统

## VSCode

- 使用 ESLint 格式化（非 Prettier），保存时自动修复（`source.fixAll.eslint`）
- 文件嵌套：`package.json` 嵌套显示 lock 文件和配置文件
- CSS 文件关联为 `tailwindcss` 语言，支持 Tailwind 智能提示
- Tailwind CSS 配置：`classAttributes: ["class", "ui"]`，`classFunctions: ["defineAppConfig"]`
