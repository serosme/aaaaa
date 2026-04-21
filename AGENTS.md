# AGENTS.md

## 项目结构

基于 npm workspaces 的 Electron + Nuxt 3 单体仓库：

- `packages/renderer` - Nuxt 4 前端（Vue 3、Nuxt UI 4、Tailwind CSS 4、@iconify-json/lucide 图标）
- `packages/electron` - Electron 主进程（TypeScript、electron-builder 打包、electron-store 配置存储）
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
- **全局快捷键**：`Alt+Space` 切换主窗口显示/隐藏，窗口失焦自动隐藏
- **路由**：Nuxt 文件系统路由（`app/pages/`），使用 `hashMode: true`
- **布局系统**：Nuxt 布局（`app/layouts/`）
- **IPC 通信**：
  - `packages/shared/src/ipc/` 定义 IPC 通道类型（`conf`、`path`、`window`、`chat`）
  - `packages/electron/src/ipc/` 实现 IPC 处理逻辑（`path.ts`、`window.ts`、`chat.ts`）
  - `packages/electron/src/preload.ts` 通过 `contextBridge` 暴露 `electronAPI`
- **应用管理**（Server API）：
  - `packages/renderer/server/api/app/` - 应用列表与启动 API（`index.get.ts`、`[base64url].get.ts`）
  - `packages/renderer/app/composables/useApp.ts` - 应用 composable（`useApp()`）
  - `packages/renderer/shared/utils/base64url.ts` - base64url 编码/解码工具
- **配置存储**：使用 `electron-store` 存储配置（`MusicConf`、`AsrConf`）
- **系统托盘**：`packages/electron/src/tray/` 实现托盘菜单
- **窗口管理**：
  - `packages/electron/src/window/main.ts` 管理主窗口（显示/隐藏/切换）
  - `packages/electron/src/window/home.ts` 创建新窗口（支持路由跳转，生产环境使用 hash 参数）
- **输出目录**：`packages/*/dist/` 为编译输出，`packages/renderer/.output/` 为 Nuxt 构建输出，`packages/electron/release/` 为打包输出（Windows zip）
- **样式**：Tailwind CSS 4，VSCode 中 CSS 文件关联为 `tailwindcss` 语言

## 类型定义

- `packages/shared/src/types/` - 共享类型定义（`asr.ts`、`music.ts`）
- `packages/renderer/shared/types/` - Nuxt 本地类型定义（`application.ts`）
- `packages/shared/src/store.ts` - Store 类型定义（`StoreSchema`）
- `packages/shared/src/electron/index.ts` - `ElectronAPI` 接口定义
- `packages/renderer/app/types/electron.d.ts` - 全局 `Window.electronAPI` 类型扩展

## VSCode

- 使用 ESLint 格式化（非 Prettier），保存时自动修复（`source.fixAll.eslint`）
- 文件嵌套：`package.json` 嵌套显示 lock 文件和配置文件
- CSS 文件关联为 `tailwindcss` 语言，支持 Tailwind 智能提示
- Tailwind CSS 配置：`classAttributes: ["class", "ui"]`，`classFunctions: ["defineAppConfig"]`
