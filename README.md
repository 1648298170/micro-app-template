# qiankun 微前端项目模板

这是一个面向生产落地的 qiankun 微前端项目模板，采用 **React 主应用 + qiankun + Vite 8 Rolldown/OXC + pnpm workspace** 架构。

模板的目标不是只让微应用“能跑起来”，而是从一开始就处理微前端项目中最常见的问题：

- 样式污染
- 路由冲突
- 通信失控
- 资源路径错误
- 重复依赖与性能问题
- 沙箱边界和内存泄漏
- 部署与版本管理
- UI 体验不一致
- 调试复杂
- SEO / SSR 边界不清

## 一、整体设计理念

本项目遵循以下设计原则：

```txt
主应用管平台
子应用管业务
packages 管复用
manifest 管版本
CI/CD 管发布
规范管长期维护
```

也就是说：

- 主应用只负责平台级能力，例如登录、布局、菜单、权限、子应用注册和全局通信。
- 子应用负责具体业务模块，例如用户中心、订单中心、报表中心。
- 公共能力沉淀到 `packages`，避免每个应用重复实现。
- 子应用可以独立开发、独立构建、独立部署。
- 主应用通过环境变量或 manifest 获取子应用入口，避免版本强绑定。

## 二、技术栈

主应用：

```txt
React
TypeScript
Vite 8
Rolldown
OXC
qiankun
React Router
```

子应用：

```txt
React + Vite 8
Vue 3 + Vite 8
其他框架可按 qiankun 生命周期协议继续接入
```

工程治理：

```txt
pnpm workspace
Oxlint
Prettier
TypeScript
Vitest
Playwright
```

部署治理：

```txt
Nginx
Docker
CDN
Manifest
CI/CD
```

## 三、OXC 在本项目中的使用方式

本模板里的 OXC 分两层使用：

```txt
构建层：Vite 8 + Rolldown + OXC
检查层：Oxlint
```

### 1. 构建层

项目统一使用 Vite 8 稳定版：

```txt
vite 8.0.16
```

Vite 8 的构建链路基于 Rolldown，转换能力来自 OXC。React 应用使用：

```txt
@vitejs/plugin-react 6.x
```

也就是说，主应用和 React 子应用的 TS/JSX 转换不再走传统 Babel 默认链路，而是跟随 Vite 8 插件体系使用 OXC 能力。

### 2. 检查层

项目已经移除 ESLint，统一使用 OXC 生态的 Oxlint：

```json
{
  "scripts": {
    "lint": "oxlint .",
    "lint:fix": "oxlint . --fix"
  }
}
```

Oxlint 配置文件：

```txt
.oxlintrc.json
```

### 3. 为什么还保留 Prettier

Prettier 只负责格式化。项目没有用它做代码规则检查，也不会让它替代 Oxlint：

```txt
pnpm run format
pnpm run format:check
```

它不负责类型检查，也不负责代码规则检查。当前职责划分是：

```txt
Vite 8 / OXC     负责构建转换
Oxlint           负责代码质量检查
Prettier         负责代码格式化
TypeScript       负责类型检查
```

本地提交前推荐执行：

```txt
pnpm run check
```

这个命令会串行执行：

```txt
pnpm run lint
pnpm run type-check
pnpm run format:check
```

因此当前推荐组合是：

```txt
构建转换：Vite 8 / Rolldown / OXC
代码检查：Oxlint
代码格式化：Prettier
类型检查：TypeScript / vue-tsc
```

## 四、目录结构

```txt
qiankun-template
├─ apps
│  ├─ main-react-app          # React 主应用，微前端基座
│  ├─ react-admin             # React 子应用示例
│  └─ vue-admin               # Vue 3 子应用示例
│
├─ packages
│  ├─ shared                  # 公共类型、权限、事件、微应用协议、清理机制
│  ├─ request                 # HTTP 请求封装
│  ├─ ui                      # 主题 token、公共 UI 能力
│  ├─ hooks                   # 通用 hooks
│  └─ config                  # 共享配置包占位
│
├─ deploy
│  ├─ manifest.example.json   # 子应用版本和入口配置示例
│  └─ nginx.example.conf      # Nginx 部署配置示例
│
├─ docs
│  ├─ architecture.md         # 架构说明
│  └─ micro-app-contract.md   # 微应用接入契约
│
├─ scripts
│  └─ create-app.mjs          # 最小化子应用目录生成脚本
│
├─ tests
│  └─ e2e                    # Playwright E2E 测试
│
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ .oxlintrc.json
└─ playwright.config.ts
```

## 五、apps 目录说明

`apps` 用来放所有可独立运行、独立构建、独立部署的应用。

### 1. main-react-app

路径：

```txt
apps/main-react-app
```

这是 React 主应用，也是整个微前端平台的基座。

它负责：

- 登录认证
- Token 管理
- 用户信息管理
- 全局布局
- 菜单渲染
- 一级路由控制
- 权限控制
- qiankun 子应用注册
- 子应用挂载容器
- 全局事件通信
- 主题变量下发
- 子应用加载失败兜底

主应用不应该写具体业务模块。业务模块应该放到子应用中。

### 2. react-admin

路径：

```txt
apps/react-admin
```

这是一个 React 子应用示例，用来展示 React 技术栈如何接入 qiankun。

它支持两种运行模式：

- 独立运行：直接访问 `http://localhost:7101`
- 被主应用挂载：访问主应用中的 `/react-admin`

### 3. vue-admin

路径：

```txt
apps/vue-admin
```

这是一个 Vue 3 子应用示例，用来展示 Vue 技术栈如何接入 qiankun。

它同样支持两种运行模式：

- 独立运行：直接访问 `http://localhost:7102`
- 被主应用挂载：访问主应用中的 `/vue-admin`

Vue 子应用使用 Composition API 和 `<script setup lang="ts">`。

## 六、packages 目录说明

`packages` 用来放跨应用复用的能力。

### 1. packages/shared

公共协议包，负责定义微前端系统中的稳定契约。

包含：

- 用户信息类型
- 权限模型
- `hasPermission` 权限判断方法
- 微应用运行时 props 类型
- manifest 类型
- typed event bus
- disposer 清理机制
- 应用版本上报方法

重点文件：

```txt
packages/shared/src/events.ts       # 跨应用事件协议
packages/shared/src/micro-apps.ts   # 微应用运行时协议
packages/shared/src/disposers.ts    # 副作用清理机制
packages/shared/src/auth.ts         # 用户和权限类型
```

### 2. packages/request

请求封装包。

它负责统一处理：

- token
- app-name
- app-version
- HTTP 错误

这样每个子应用不需要重复写请求拦截逻辑。

### 3. packages/ui

公共 UI 和主题包。

当前主要提供：

- 设计 token
- CSS 变量注入方法

后续可以继续扩展：

- 公共按钮
- 公共表格
- 空状态
- 错误状态
- 加载状态
- 权限提示组件

### 4. packages/hooks

通用 hooks 包。

当前是基础占位，后续可以沉淀跨应用复用的 React hooks。

### 5. packages/config

共享配置包占位。

后续可以沉淀：

- Oxlint 配置
- Prettier 配置
- Stylelint 配置
- Vite 公共配置
- TypeScript 公共配置

## 七、主应用如何加载子应用

主应用通过 qiankun 注册子应用。

核心文件：

```txt
apps/main-react-app/src/config/micro-apps.ts
apps/main-react-app/src/config/register-micro-apps.ts
```

注册信息包含：

```txt
name        子应用名称
entry       子应用入口
container   子应用挂载容器
activeRule  子应用激活路由
props       主应用下发给子应用的运行时能力
```

示例：

```ts
{
  name: 'react-admin',
  entry: import.meta.env.VITE_REACT_ADMIN_ENTRY,
  container: '#micro-app-container',
  activeRule: '/react-admin',
  props: {
    getToken,
    getUserInfo,
    getPermissions,
    eventBus,
  },
}
```

主应用默认开发端口：

```txt
http://localhost:7000
```

React 子应用默认入口：

```txt
http://localhost:7101
```

Vue 子应用默认入口：

```txt
http://localhost:7102
```

## 八、路由设计

路由边界是微前端稳定运行的关键。

本项目约定：

```txt
主应用只管理一级路由
子应用只管理自己的内部路由
```

主应用路由：

```txt
/login
/home
/react-admin/*
/vue-admin/*
```

子应用路由：

```txt
/react-admin/**
/vue-admin/**
```

硬性约束：

- 子应用不能注册主应用根路径 `/`
- 每个子应用必须有唯一 `activeRule`
- 子应用的 `basename` 必须和主应用 `activeRule` 对齐
- 部署时 Nginx 必须配置 history fallback

## 九、通信设计

本项目只允许三类跨应用通信方式：

```txt
1. props
2. eventBus
3. packages/shared
```

### props

用于主应用向子应用下发稳定运行时能力：

```txt
getToken
getUserInfo
getPermissions
eventBus
```

### eventBus

用于跨应用事件通知。

事件必须集中定义在：

```txt
packages/shared/src/events.ts
```

当前内置事件：

```txt
auth:logout
menu:refresh
theme:change
notification:push
```

### packages/shared

用于共享类型、工具方法、事件协议和权限方法。

禁止：

- 子应用直接调用其他子应用
- 子应用直接读取主应用内部模块
- 随意新增未声明的事件名

## 十、样式隔离设计

微前端项目中样式污染非常常见，所以模板采用组合治理：

```txt
qiankun experimentalStyleIsolation
子应用根节点命名空间
CSS Modules / scoped CSS
统一 CSS 变量
弹窗挂载容器规范
```

主应用开启：

```ts
start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
})
```

子应用需要使用自己的根 class，例如：

```txt
react-admin-root
vue-admin-root
```

不推荐子应用写这类全局样式：

```css
body {
  margin: 0;
}

.ant-btn {
  width: 100%;
}
```

## 十一、生命周期与内存清理

每个子应用都必须支持 qiankun 生命周期：

```txt
bootstrap
mount
unmount
```

子应用在 `unmount` 时必须清理：

- React root / Vue app 实例
- 事件监听
- 定时器
- 订阅
- WebSocket
- 第三方 SDK
- 未完成请求

模板提供了 disposer 机制：

```txt
packages/shared/src/disposers.ts
```

它的作用是统一登记清理函数，在子应用卸载时集中释放，避免重复监听和内存泄漏。

## 十二、资源路径与部署设计

子应用可以独立部署到 CDN 或静态资源服务器。

生产环境建议使用：

```txt
manifest
```

示例文件：

```txt
deploy/manifest.example.json
```

示例：

```json
{
  "react-admin": {
    "version": "0.1.0",
    "entry": "https://static.example.com/react-admin/0.1.0/index.html",
    "status": "stable"
  }
}
```

这样主应用不需要硬编码子应用地址，可以通过 manifest 实现：

- 独立发布
- 版本锁定
- 灰度发布
- 快速回滚

缓存策略：

```txt
index.html        no-cache
assets/*          long-term cache
```

Nginx 示例：

```txt
deploy/nginx.example.conf
```

## 十三、scripts 目录说明

当前脚本：

```txt
scripts/create-app.mjs
```

它是一个最小化微应用目录生成脚本。

使用方式：

```bash
node scripts/create-app.mjs order-admin
```

生成：

```txt
apps/order-admin
├─ src
└─ README.md
```

它不会默认生成 React 或 Vue 代码，因为不同业务子应用可能使用不同技术栈。脚本只负责创建统一位置和基础说明。

## 十四、常用命令

安装依赖：

```bash
pnpm install
```

启动全部应用：

```bash
pnpm dev
```

只启动主应用：

```bash
pnpm dev:main
```

只启动 React 子应用：

```bash
pnpm dev:react-admin
```

只启动 Vue 子应用：

```bash
pnpm dev:vue-admin
```

类型检查：

```bash
pnpm run type-check
```

代码检查：

```bash
pnpm run lint
```

自动修复 Oxlint 可修复的问题：

```bash
pnpm run lint:fix
```

格式化代码：

```bash
pnpm run format
```

检查格式是否正确：

```bash
pnpm run format:check
```

提交前总检查：

```bash
pnpm run check
```

生产构建：

```bash
pnpm run build
```

E2E 测试：

```bash
pnpm run e2e
```

## 十五、本地访问地址

默认端口：

```txt
主应用：        http://localhost:7000
React 子应用：  http://localhost:7101
Vue 子应用：    http://localhost:7102
```

访问主应用后，可以通过左侧菜单进入子应用：

```txt
/react-admin
/vue-admin
```

## 十六、新增子应用流程

1. 创建应用目录：

```bash
node scripts/create-app.mjs order-admin
```

2. 选择技术栈，例如 React 或 Vue。

3. 按照微应用契约实现：

```txt
bootstrap
mount
unmount
独立运行
主应用挂载运行
basename
unmount 清理
```

4. 在主应用中注册：

```txt
apps/main-react-app/src/config/micro-apps.ts
```

5. 配置环境变量或 manifest entry。

6. 补充菜单和权限。

7. 跑检查：

```bash
pnpm run type-check
pnpm run lint
pnpm run build
```

## 十七、强制约束

为了保证项目长期可维护，模板要求：

```txt
1. 每个子应用必须有唯一 name、activeRule、port
2. 子应用必须支持独立运行和 qiankun 挂载运行
3. 子应用不能注册根路径 /
4. 子应用不能直接修改主应用 DOM
5. 子应用不能直接调用其他子应用
6. 所有跨应用事件必须在 packages/shared 中声明
7. 子应用卸载时必须清理副作用
8. 所有 entry 必须来自 env 或 manifest
9. index.html 禁止强缓存
10. 每个应用需要能输出 appName 和 version
```

## 十八、验证状态

当前模板已通过：

```txt
pnpm run type-check
pnpm run lint
pnpm run build
pnpm run e2e
```

## 十九、推荐阅读顺序

如果你是第一次看这个项目，建议按这个顺序阅读：

```txt
README.md
docs/architecture.md
docs/micro-app-contract.md
apps/main-react-app/src/config/micro-apps.ts
apps/main-react-app/src/config/register-micro-apps.ts
packages/shared/src/events.ts
packages/shared/src/disposers.ts
apps/react-admin/src/main.tsx
apps/vue-admin/src/main.ts
```

这样可以先理解整体架构，再看主应用如何注册子应用，最后看子应用如何接入和清理。
