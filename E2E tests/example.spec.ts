import { test, expect } from '@playwright/test';


test('homepage has Bakery and links to login', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('welcome-label')).toBeVisible();
});
