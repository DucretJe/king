FROM nginx:1.25.0-bullseye-perl

ENV KING_VER v3.0.9
# renovate: datasource=repology depName=debian_11/unzip versioning=loose
ENV UNZIP_VER 6.0-26+deb11u1

ADD https://github.com/ligreman/king/releases/download/${KING_VER}/King-for-Kong-${KING_VER}.zip /tmp/King-for-Kong-${KING_VER}.zip

RUN apt-get update \
    && apt-get install -y unzip=${UNZIP_VER} \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && unzip -o /tmp/King-for-Kong-${KING_VER}.zip -d /usr/share/nginx/html/

RUN sed -i 's/^pid.*/pid \/tmp\/nginx.pid;/' /etc/nginx/nginx.conf

RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup appuser \
    && chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/run

USER appuser

CMD ["nginx", "-g", "daemon off;"]