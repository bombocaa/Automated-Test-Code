import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://coffee-cart.app/',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
});
