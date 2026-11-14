import { test, expect } from './fixtures';
import { coffee, customer } from './data/customer';

test('customer can buy a coffee', async ({ page, coffeeCart, checkout }) => {
  await coffeeCart.addCoffee(coffee.name);
  await coffeeCart.dismissPromoIfShown();

  await expect(page.locator('button[data-test="checkout"]')).toBeVisible();
  await coffeeCart.checkout();
  await checkout.submitPaymentDetails(customer.name, customer.email);
  await checkout.expectSuccess();
});
