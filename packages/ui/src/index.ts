export const themeTokens = {
  colorPrimary: '#155dfc',
  colorAccent: '#0f766e',
  colorWarning: '#b45309',
  colorSurface: '#ffffff',
  colorCanvas: '#f6f7f9',
  colorText: '#172033',
  borderRadius: 6,
  spacingBase: 8,
}

export function applyThemeTokens(root: HTMLElement = document.documentElement) {
  root.style.setProperty('--app-primary-color', themeTokens.colorPrimary)
  root.style.setProperty('--app-accent-color', themeTokens.colorAccent)
  root.style.setProperty('--app-warning-color', themeTokens.colorWarning)
  root.style.setProperty('--app-surface-color', themeTokens.colorSurface)
  root.style.setProperty('--app-canvas-color', themeTokens.colorCanvas)
  root.style.setProperty('--app-text-color', themeTokens.colorText)
  root.style.setProperty('--app-radius', `${themeTokens.borderRadius}px`)
  root.style.setProperty('--app-space', `${themeTokens.spacingBase}px`)
}
