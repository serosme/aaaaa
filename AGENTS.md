# AGENTS.md

## 项目结构

基于 npm workspaces 的 Electron + Vue 3 单体仓库：

- `packages/renderer` - Vue 3 前端（Vite、Nuxt UI、Tailwind CSS 4、vue-router 文件路由）
- `packages/electron` - Electron 主进程（TypeScript、electron-builder 打包）
- `packages/shared` - 类型定义包（`shared`，仅导出接口/类型，无具体实现）

## 命令

```bash
npm run dev          # 同时启动渲染进程和 Electron 主进程
npm run dev:renderer # 仅启动渲染进程（Vite 开发服务器）
npm run dev:electron # 仅启动 Electron（需先构建渲染进程）
npm run lint         # ESLint 检查（@antfu/eslint-config）
npm run lint:fix     # 自动修复 lint 问题
npm run release      # 完整发布：构建渲染进程 -> 编译 Electron -> electron-builder（Windows zip）
```

## 关键说明

- **构建顺序**：`npm run release` 会先构建渲染进程到 `packages/renderer/dist`，再打包进 Electron
- **全局快捷键**：`Alt+Space` 切换主窗口显示/隐藏
- **路由**：使用 `createWebHashHistory()` 和文件路由（自动生成 `typed-router.d.ts`）
- **IPC 通信**：`packages/shared` 定义类型契约，`packages/electron/src/ipc/` 实现具体逻辑
- **输出目录**：`dist/` 为编译输出，`release/` 为打包输出
- **样式**：Tailwind CSS 4，VSCode 中 CSS 文件关联为 `tailwindcss` 语言

## VSCode

- 使用 ESLint 格式化（非 Prettier），保存时自动修复
