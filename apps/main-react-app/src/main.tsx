import { applyThemeTokens } from '@packages/ui'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './styles/global.css'

applyThemeTokens()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // qiankun 子应用挂载依赖稳定存在的 container。
  // React StrictMode 在开发态会额外触发挂载/卸载检查，可能导致 qiankun mount 时容器短暂不存在。
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
