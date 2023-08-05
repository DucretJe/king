# Tests

Those tests **must** succeed to merge a PR.

## Scenario

We mount an empty but functionnal Kong service using `docker-compose`.
It assumes that we provide a file named `POSTGRES_PASSWORD` for its database to work.

We build King from `/docker/Dockerfile` and deploy it too.

## Test 1

We created a puppeteer script using Chrome.  
<img width="590" alt="image" src="https://github.com/DucretJe/king/assets/5384298/db907f83-a2a6-4163-83c3-3e81fd33514c">

The script has been modified to await the banner `Connected to node` to pop when Kong's admin API is setup.  
<img width="359" alt="image" src="https://github.com/DucretJe/king/assets/5384298/e40f8ee9-4aab-4cf0-b531-1e83a0509fc9">

The test is successful if puppeteer catch the string `Connected to node`
