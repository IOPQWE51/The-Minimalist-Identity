# ✧ Project Aura — The Minimalist Identity

**Ethereal Minimalism: A Personal Digital Garden**

> A digital garden where light meets glass.
> Minimal. Translucent. Breathing.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF006E?logo=framer)

## 简介

Project Aura（灵光计划）是一个个人数字花园与作品集网站。它探索设计、代码与极简哲学的交汇点——在 2026 年的 Web 审美中，通过玻璃拟态与弹簧物理动效，打造一个有呼吸感的在线空间。

这不是一个模板，而是一个完整的视觉身份系统：从色彩、排版、动效到交互细节，每一个像素都经过精心设计。

## 设计哲学

**空灵极简 (Ethereal Minimalism)** —— 以"少即是多"为核心，通过光影与通透感传递秩序之美。

- **玻璃拟态 (Glassmorphism)** — 所有卡片容器使用 `backdrop-blur-xl`，配合半透明背景，呈现磨砂玻璃质感
- **极光背景 (Aurora)** — 4 个缓慢浮动的渐变球体模拟极光效果，低饱和度的紫、蓝、橙色调
- **弹簧物理 (Spring Physics)** — 所有 Hover / 点击交互使用 `type: "spring"`，刚度 260、阻尼 20，带来 Apple 级别的"阻尼感"
- **平滑滚动 (Smooth Scroll)** — 集成 Lenis 实现丝滑滚动体验
- **光标追踪** — GlassCard 组件追踪鼠标位置，渲染跟随光标的径向渐变光晕

## 技术栈

| 领域 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 (strict) |
| 样式 | Tailwind CSS v4 + CSS Custom Properties |
| 动效 | Framer Motion 12 (spring physics) |
| 滚动 | Lenis 1.3 |
| 主题 | next-themes (Light / Dark / System) |
| 图标 | Lucide React 1.1 |
| 字体 | Geist Sans · Geist Mono · Playfair Display |

## 页面结构

- **Hero** — 全屏沉浸式着陆区，带动画标题与 CTA
- **Bento Grid** — 响应式玻璃卡片网格，链接至写作、项目、设计系统、动态、书房、留言簿
- **Recent Writings** — 精选文章列表，含日期、阅读时长与分类标签
- **Newsletter** — 邮件订阅表单
- **Command Palette** — `Cmd+K` / `Ctrl+K` 触发的命令面板，支持键盘导航、搜索与主题切换
- **Responsive Navbar** — 固定顶部导航，含移动端汉堡菜单与主题切换按钮

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/IOPQWE51/The-Minimalist-Identity.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目状态

当前为项目初期脚手架阶段，核心视觉身份、布局架构与组件系统已就绪。未来计划集成：

- [ ] CMS 后端 (Sanity.io)
- [ ] 数据库 (Supabase PostgreSQL)
- [ ] 身份验证 (NextAuth.js)
- [ ] 3D 背景 (React Three Fiber)
- [ ] MDX 博客渲染引擎
- [ ] 动态 OG 图片生成
- [ ] 分析与 Redis 集成

## 许可

MIT
