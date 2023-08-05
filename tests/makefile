.PHONY = build cleanup

# Colors
GREEN='\033[0;32m'
LGRAY='\033[0;37m'
NC='\033[0m'
ORANGE='\033[1;33m'
RED='\033[0;31m'

all: test cleanup

psql_secret:
	@echo ${ORANGE}Generating postgres password 🤫${NC} && \
	openssl rand -base64 15 | tr -dc 'a-zA-Z0-9' | head -c 10 >> POSTGRES_PASSWORD && \
	if [ $$? = 0 ]; then \
        echo ${GREEN}PSQL Password generated ✅${NC}; \
    else \
        echo ${RED}PSQL Password generation failed 🛑${NC}; \
    fi

build: psql_secret
	@echo ${ORANGE}Building docker containers 🐳${NC} && \
	docker compose build --no-cache && \
	docker compose up -d

test: build
	@echo ${ORANGE}Running tests 🧪${NC} && \
	docker run -i --init --cap-add=SYS_ADMIN --network host --rm -it -v `pwd`/puppeteer.js:/workdir/puppeteer.js ghcr.io/puppeteer/puppeteer:latest bash -c 'node -e "$$(cat /workdir/puppeteer.js)"'; \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -eq 0 ]; then \
		echo ${GREEN}Tests passed ✅${NC}; \
	else \
		echo ${RED}Tests failed 🛑${NC}; \
		exit $$EXIT_CODE; \
	fi


cleanup: build
	@echo ${ORANGE}Cleaning up 🧹${NC} && \
	docker compose down --remove-orphans -v && \
	rm -rf POSTGRES_PASSWORD && \
	if [ $$? = 0 ]; then \
		echo ${GREEN}Cleanup complete ✅${NC}; \
	else \
		echo ${RED}Cleanup failed 🛑${NC}; \
	fi
