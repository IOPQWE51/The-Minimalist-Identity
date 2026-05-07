# ✧ Ethereal Minimalism: 个人全栈数字花园技术设计全案

**项目代号：** Project Aura (灵光计划)
**版本：** v1.0.0
**设计理念：** 极简、通透、光影、秩序。

---

## 1. 视觉灵魂 (Visual Identity & Design System)

本设计旨在通过“空灵极简”主义，在 2026 年的 Web 审美中实现突围。核心是利用 **Glassmorphism (玻璃拟态)** 和 **Spring Physics (弹簧物理动力学)** 打造呼吸感。

### 1.1 色彩与质感 (Materials & Colors)
* **底色层 (The Void):** * Light Mode: `#FAFAFA` (晨雾白)
    * Dark Mode: `#050505` (深邃黑)
* **磨砂玻璃 (Frosted Glass):** * 所有卡片容器使用 `backdrop-blur-xl`，背景色为 `rgba(255, 255, 255, 0.05)` (Dark) 或 `rgba(255, 255, 255, 0.4)` (Light)。
* **光影折射 (Refraction):** * 在页面背景中使用 3-4 个缓慢浮动的 `Linear Gradients` 圆球，模拟极光 (Aurora) 或光晕效果，颜色使用低饱和度的紫、蓝、橙。

### 1.2 排版美学 (Typography)
* **UI/功能性文字:** `Geist Sans` (Vercel) 或 `Inter`。字间距 `-0.02em`。
* **叙事/标题文字:** `Playfair Display` (衬线体)。在 H1 和 H2 标签中交替使用，营造人文气息。
* **代码字体:** `JetBrains Mono`。

---

## 2. 交互与动效 (UX & Motion)

### 2.1 物理动效引擎
* **全局平滑滚动:** 必须集成 `Lenis`。
* **弹簧交互:** 所有 Hover 和点击状态使用 `Framer Motion` 的 `type: "spring"`。
    * `stiffness: 260`, `damping: 20` (Apple 级别的阻尼感)。
* **页面切换:** 实现基于 `AnimatePresence` 的横向平滑推移或淡入淡出。

### 2.2 核心模块交互
* **⌘K 命令面板:** 极简浮窗，支持全站模糊搜索、暗黑模式切换、快捷跳转。
* **Bento Grid (便当盒布局):** 首页由大小不一的卡片组成，鼠标悬停时卡片内部会有微妙的光影随动（Glow Effect）。

---

## 3. 技术架构 (The Tech Stack)

### 3.1 前端：The Canvas
* **框架:** Next.js 15 (Stable) 使用 App Router。
* **组件库:** 基于 `shadcn/ui` 进行重度魔改（剥离所有硬边缘，改为圆角与阴影）。
* **着陆页背景:** 集成 `React Three Fiber` (Three.js)，渲染一个低频振动的 3D 流体平面。

### 3.2 內容管理：The Memory
* **无头 CMS:** Sanity.io。
    * 支持 MDX 渲染。
    * 实时预览（Live Edit）功能。
* **资产存储:** 所有图片自动转换为 WebP/AVIF，并通过 Cloudinary 或 Sanity CDN 边缘分发。

### 3.3 数据与后端：The Engine
* **数据库:** Supabase (PostgreSQL)。
* **实时交互:** * 使用 Supabase Realtime 处理文章点赞（Like）和留言板（Guestbook）。
    * 使用 Redis (Upstash) 存储全局访客统计数据（Analytics）。
* **身份验证:** NextAuth.js 集成 GitHub / Google 登录。

---

## 4. 方方面面的细节思考 (The Details)

### 4.1 SEO 与元数据
* **动态 Open Graph:** 为每一篇文章自动生成带有标题和摘要的优雅 OG 图片。
* **JSON-LD:** 严格遵循 Schema.org 的结构化数据注入，优化 Google 搜索权重。

### 4.2 性能工程 (Performance)
* **Lighthouse 目标:** 100/100/100/100。
* **字体优化:** 使用 `next/font` 预加载，禁止布局偏移 (CLS)。
* **图片策略:** 强制使用 `next/image` 的 blur-up 占位符。

### 4.3 开发者体验 (DX)
* **代码规范:** 启用极严的 ESLint 和 Prettier 配置。
* **类型安全:** 100% TypeScript 覆盖。

---

## 5. 执行指令集 (Action Items for MiMo-v2.5-pro)

MiMo，请你现在接管此项目，并分阶段执行：

1.  **初始化工程:** 创建 Next.js 15 项目，配置 Tailwind、Lucide Icons 和 Framer Motion。
2.  **构建核心组件:** 实现包含 `backdrop-blur` 的 `Navbar`、`GlassCard` 和 `BentoGrid` 容器。
3.  **集成 CMS:** 编写 Sanity 的内容模型 schema。
4.  **全量代码生成:** 输出完整的首页逻辑和文章渲染引擎代码。

**注意:** 充分利用你的 128K 输出限制，不要提供简化代码，我需要开箱即用的工业级实现。
