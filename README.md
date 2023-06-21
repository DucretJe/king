# King docker image

[![💫 Super-Linter](https://github.com/DucretJe/king/actions/workflows/linter.yaml/badge.svg?branch=main)](https://github.com/DucretJe/king/actions/workflows/linter.yaml)
[![🚀 Build and Push Docker Image](https://github.com/DucretJe/king/actions/workflows/build.yaml/badge.svg?branch=main)](https://github.com/DucretJe/king/actions/workflows/build.yaml)

This repository creates a docker image for [King](https://github.com/ligreman/king)
Dependencies on King are handled by renovate.

## How to

### Alias

```sh
alias king ='docker run --rm -p 8080:80 -d --pull always ghcr.io/ducretje/king:latest'
```
