# Tests

Those tests **must** succeed to merge a PR.

## Scenario

We mount an empty but functionnal Kong service using `docker-compose`.
It assumes that we provide a file named `POSTGRES_PASSWORD` for its database to work.

We build King from `/docker/Dockerfile` and deploy it too.

## Test 1

We created a puppeteer script using Chrome.

The script has been modified to await the banner `Connected to node` to pop when Kong's admin API is setup.

The test is successful if puppeteer catch the string `Connected to node`
