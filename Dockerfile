FROM node:9

MAINTAINER "HMCTS Evidence Team <https://github.com/hmcts>"
LABEL maintainer="HMCTS Evidence Team <https://github.com/hmcts>"

ENV NODE_ENV development
ENV PORT 8080

ENV CORS_ORIGIN_METHODS GET,POST,PUT,DELETE,OPTIONS
ENV XFWD true

#      logging env vars
ENV ROOT_APPENDER JSON_CONSOLE
ENV LOG_OUTPUT single
ENV JSON_CONSOLE_PRETTY_PRINT false
ENV REFORM_SERVICE_TYPE document-management-store-api-gateway-web
ENV REFORM_SERVICE_NAME JSON_CONSOLE
ENV REFORM_TEAM cc
ENV REFORM_ENVIRONMENT docker
#      healthcheck env vars
ENV PACKAGES_ENVIRONMENT docker
ENV PACKAGES_PROJECT evidence
ENV PACKAGES_NAME document-management-store-api-gateway-web

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

#HEALTHCHECK --interval=10s --timeout=10s --retries=10 CMD http_proxy= curl --silent --fail http://localhost:8080/health

EXPOSE 8080

CMD [ "yarn", "start" ]
