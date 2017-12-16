# Document Management API Gateway Web 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/hmcts/document-management-api-gateway-web.svg?branch=master)](https://travis-ci.org/hmcts/document-management-api-gateway-web)
[![codecov](https://codecov.io/gh/hmcts/document-management-api-gateway-web/branch/master/graph/badge.svg)](https://codecov.io/gh/hmcts/document-management-api-gateway-web)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7cb6c8ab14544a8ab1ac44de59d8e30a)](https://www.codacy.com/app/HMCTS/document-management-api-gateway-web)
[![Known Vulnerabilities](https://snyk.io/test/github/hmcts/document-management-api-gateway-web/badge.svg)](https://snyk.io/test/github/hmcts/document-management-api-gateway-web) 


### Tech

It uses:

* Node.js
* Express.js

## Quickstart

### Run Locally with Node (frontend only)
```bash
git clone https://github.com/hmcts/document-management-api-gateway-web.git
cd document-management-api-gateway-web
./buildrundm-native.sh
```
The open endpoint is at http://localhost:8080

### Run Locally with Docker (Includes Backend Services)
```bash
git clone https://github.com/hmcts/document-management-api-gateway-web.git
cd document-management-api-gateway-web
./buildrundm-docker.sh
```
The open endpoint is at http://localhost:8080

## Config

Configuration is achieved through [node-config](https://github.com/lorenwest/node-config).

As described in `config/custom-environment-variables.yaml`, the following properties can be overridden with environment variables:
* `EM_API_URL`: Target address of the evidence management API
* `IDAM_BASE_URL`: Target address of the IDAM user API
* `IDAM_S2S_URL`: Target address of the IDAM service API
* `CORS_ORIGIN_METHODS`: Allowed HTTP verbs when calling the api gateway.
* `CORS_ORIGIN_WHITELIST`: Allowed list or origin hosts when calling the api gateway.
