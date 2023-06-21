# King docker image

This repository creates a docker image for [King](https://github.com/ligreman/king)
Dependencies on King are handled by renovate.

## How to

### Alias

```sh
alias king ='docker run --rm -p 8080:80 -d --pull always ghcr.io/ducretje/king:latest'
```