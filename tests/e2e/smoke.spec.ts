import { expect, test } from '@playwright/test'

test('host shell renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Production micro frontend template')).toBeVisible()
})
