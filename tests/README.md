# Tests

Those tests **must** succeed to merge a PR.

## Scenario

We mount an empty but functionnal Kong service using `docker-compose`.
It assumes that we provide a file named `POSTGRES_PASSWORD` for its database to work.

We build King from `/docker/Dockerfile` and deploy it too.

## Test 1

We created a puppeteer script using Chrome.
<p align="center">
  <img width="590" alt="image" src="https://github.com/DucretJe/king/assets/5384298/db907f83-a2a6-4163-83c3-3e81fd33514c">
</p>

The script has been modified to await `Kong node information` section to appear meaning it can connect to the Kong Admin API.
<p align="center">
  <img width="359" alt="image" src="https://github.com/DucretJe/king/assets/5384298/e40f8ee9-4aab-4cf0-b531-1e83a0509fc9">
</p>

> ✅ The test is successful if puppeteer catch the string `Kong node information`

### Debug

Bumping from 3.0.9 to 3.0.11 the test was failing, and we figured out that due to a slight change in the UI of King, the automation was triggering a wrong button using the screenshot feature.

```js
await page.screenshot({ path: '/output/screenshot.png' });
```
