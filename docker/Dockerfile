FROM nginx:stable@sha256:fbf73dbbfd95e0fe1a2ed672e0d417f87e37c2ac7149bc1d9494c68352b8e4e7

ENV KING_VER v3.0.11
# renovate: datasource=repology depName=debian_11/unzip versioning=loose
ENV UNZIP_VER 6.0

RUN apt-get update \
    && apt-get install --no-install-recommends -y "unzip=${UNZIP_VER}*" \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl -LO https://github.com/ligreman/king/releases/download/latest/King-for-Kong-${KING_VER}.zip -o King-for-Kong-${KING_VER}.zip \
    && unzip -o King-for-Kong-${KING_VER}.zip -d /usr/share/nginx/html/

RUN sed -i 's/^pid.*/pid \/tmp\/nginx.pid;/' /etc/nginx/nginx.conf

RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup appuser \
    && chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/run

USER appuser

EXPOSE 80
HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
