import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async submitPaymentDetails(name: string, email: string) {
    await this.page.locator('#name').fill(name);
    await this.page.locator('#email').fill(email);
    await this.page.locator('#submit-payment').click();
  }

  async expectSuccess() {
    await expect(this.page.locator('#app .success')).toContainText('Thanks for your purchase.');
  }
}
