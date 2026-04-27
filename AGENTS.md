# AGENTS.md

## 项目结构

基于 npm workspaces 的 Electron + Nuxt 4 单体仓库：

- `packages/renderer` - Nuxt 4 前端（Vue 3、Nuxt UI 4、Tailwind CSS 4、@iconify-json/lucide 图标）
- `packages/electron` - Electron 主进程（TypeScript、electron-builder 打包、conf 配置存储）
- `packages/shared` - 类型定义包（IPC 通道、ElectronAPI、类型接口，无具体实现）

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
- **IPC 通信**：
  - `packages/shared/src/ipc/` 定义 IPC 通道类型（`path`、`window`、`relay`）
  - `packages/electron/src/ipc.ts` - IPC `handle()` 辅助函数
  - `packages/electron/src/ipc/` 实现 IPC 处理逻辑（`path.ts`、`window.ts`、`relay.ts`）
  - `packages/electron/src/preload.ts` 通过 `contextBridge` 暴露 `electronAPI`
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
- **系统托盘**：`packages/electron/src/tray/` 实现托盘菜单
- **窗口管理**：
  - `packages/electron/src/window/command.ts` - 命令面板窗口（Alt+Space 切换、失焦隐藏、skipTaskbar）
  - `packages/electron/src/window/home.ts` - 通用窗口创建（支持路由跳转）
  - `packages/electron/src/window/relay.ts` - 中继聊天窗口（WebContentsView 多站点）
  - `packages/electron/src/utils/window.ts` - 窗口工具函数（`startRendererProcess`、`loadURL`、`openDevTools`）
- **输出目录**：`packages/*/dist/` 为编译输出，`packages/renderer/.output/` 为 Nuxt 构建输出，`packages/electron/release/` 为打包输出（Windows zip）
- **样式**：Tailwind CSS 4 + Nuxt UI，CSS 入口 `app/assets/css/main.css`，VSCode 中 CSS 文件关联为 `tailwindcss` 语言

## 类型定义

- `packages/shared/src/types/` - 共享类型定义（`asr.ts`、`music.ts`、`index.ts`）
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
