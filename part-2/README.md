# Part 2: Coffee Cart tests

Run from the project root after installing dependencies:

```sh
npm install
npx playwright install chromium
npm run test:part2
```

To run the Part 2 suite with a visible browser:

```sh
npm run test:e2e:headed --workspace=coffee-cart-automation
```

Set `BASE_URL` to use another environment. The default is `https://coffee-cart.app/`.
