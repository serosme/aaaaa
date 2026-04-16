# AGENTS.md

## 项目结构

基于 npm workspaces 的 Electron + Vue 3 单体仓库：

- `packages/renderer` - Vue 3 前端（Vite 5、Nuxt UI 4、Tailwind CSS 4、vue-router 文件路由、@iconify/vue 图标）
- `packages/electron` - Electron 主进程（TypeScript、electron-builder 打包、electron-store 配置存储）
- `packages/shared` - 类型定义包（IPC 通道、ElectronAPI、类型接口，无具体实现）

## 命令

```bash
npm run dev          # 同时启动渲染进程和 Electron 主进程（concurrently）
npm run dev:renderer # 仅启动渲染进程（Vite 开发服务器，http://localhost:5173）
npm run dev:electron # 仅启动 Electron（需先编译 TypeScript）
npm run build        # 构建渲染进程 + 编译 Electron（packages/electron）
npm run lint         # ESLint 检查（@antfu/eslint-config）
npm run lint:fix     # 自动修复 lint 问题
```

## 关键说明

- **构建顺序**：`npm run build` 会先构建渲染进程到 `packages/renderer/dist`，再编译 Electron 并打包
- **全局快捷键**：`Alt+Space` 切换主窗口显示/隐藏，窗口失焦自动隐藏
- **路由**：使用 `createWebHashHistory()` 和文件路由（`vue-router/vite` 插件，自动生成 `typed-router.d.ts`）
- **布局系统**：`vite-plugin-layouts` 管理布局（`src/layouts/`）
- **IPC 通信**：
  - `packages/shared/src/ipc/` 定义 IPC 通道类型（`application`、`conf`、`path`）
  - `packages/electron/src/ipc/` 实现 IPC 处理逻辑
  - `packages/electron/src/preload.ts` 通过 `contextBridge` 暴露 `electronAPI`
- **配置存储**：使用 `electron-store` 存储配置（MusicConf、AsrConf）
- **系统托盘**：`packages/electron/src/tray/` 实现托盘菜单
- **输出目录**：`packages/*/dist/` 为编译输出，`packages/electron/release/` 为打包输出（Windows zip）
- **样式**：Tailwind CSS 4，VSCode 中 CSS 文件关联为 `tailwindcss` 语言

## VSCode

- 使用 ESLint 格式化（非 Prettier），保存时自动修复（`source.fixAll.eslint`）
- 文件嵌套：`package.json` 嵌套显示 lock 文件和配置文件
- CSS 文件关联为 `tailwindcss` 语言，支持 Tailwind 智能提示
