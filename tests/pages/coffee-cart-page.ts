import { expect, type Locator, type Page } from '@playwright/test';

export class CoffeeCartPage {
  private readonly promo: Locator;

  constructor(private readonly page: Page) {
    this.promo = page.locator('div.promo');
  }

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Coffee Cart/i);
  }

  async addCoffee(name: string) {
    await this.page.locator(`[data-test="${name}"]`).click();
  }

  async dismissPromoIfShown() {
    if (await this.promo.isVisible()) {
      await this.promo.locator('button.no').click();
    }
  }

  async checkout() {
    await this.page.locator('button[data-test="checkout"]').click();
  }
}
