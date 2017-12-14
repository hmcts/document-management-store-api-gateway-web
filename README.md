# Document Management API Gateway Web 
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
