# Coffee Cart automated tests

A small TypeScript and Playwright end-to-end test for the purchase flow on [coffee-cart.app](https://coffee-cart.app/).

## Run locally

```sh
npm install
npx playwright install chromium
npm run test:e2e
```

To watch the browser while the test runs:

```sh
npm run test:e2e:headed
```

Set `BASE_URL` to run against another environment. The default is `https://coffee-cart.app/`.

The test uses a fresh Playwright page per run, keeps customer and product data separate from the test, and handles the optional promo if it appears. GitHub Actions runs it on pushes and pull requests.
