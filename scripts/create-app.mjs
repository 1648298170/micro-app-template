import fs from 'node:fs'
import path from 'node:path'

// 最小化微应用骨架生成脚本。
// 这里只创建应用目录、src 目录和 README，避免默认绑定某个框架模板。
// 团队可以根据业务需要再选择 React、Vue 或其他技术栈。
const appName = process.argv[2]

if (!appName) {
  console.error('Usage: node scripts/create-app.mjs <app-name>')
  process.exit(1)
}

// 应用名会直接作为 apps 下的目录名，因此必须限制为安全、统一的命名格式。
if (!/^[a-z][a-z0-9-]*$/.test(appName)) {
  console.error(
    'App name must use lowercase letters, numbers, and hyphens, and start with a letter.',
  )
  process.exit(1)
}

const target = path.resolve('apps', appName)

// 已存在的应用不允许覆盖，删除、迁移或重建都应该由开发者显式处理。
if (fs.existsSync(target)) {
  console.error(`App already exists: ${target}`)
  process.exit(1)
}

// 新应用在补充框架代码前，必须先遵守微应用接入契约。
fs.mkdirSync(path.join(target, 'src'), { recursive: true })
fs.writeFileSync(
  path.join(target, 'README.md'),
  `# ${appName}\n\nFollow docs/micro-app-contract.md before implementing this app.\n`,
)

console.info(`Created ${target}`)
