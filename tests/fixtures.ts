import { test as base, expect } from '@playwright/test';
import { CheckoutPage } from './pages/checkout-page';
import { CoffeeCartPage } from './pages/coffee-cart-page';

type Fixtures = {
  coffeeCart: CoffeeCartPage;
  checkout: CheckoutPage;
};

export const test = base.extend<Fixtures>({
  coffeeCart: async ({ page }, use) => {
    const coffeeCart = new CoffeeCartPage(page);
    await coffeeCart.open();
    await use(coffeeCart);
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect };
