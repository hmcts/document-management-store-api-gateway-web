module "app" {
  source = "git@github.com:contino/moj-module-webapp?ref=master"
  product = "${var.product}-${var.app_name}-${var.app_type}"
  location = "${var.location}"
  env = "${var.env}"
  ilbIp = "${var.ilbIp}"

  app_settings = {
    # REDIS_HOST = "${module.redis-cache.host_name}"
    # REDIS_PORT = "${module.redis-cache.redis_port}"
    # REDIS_PASSWORD = "${module.redis-cache.access_key}"
    # RECIPE_BACKEND_URL = "http://rhubarb-recipe-backend-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
    WEBSITE_NODE_DEFAULT_VERSION = "8.8.0"

    # NODE_ENV = "${var.env}"
    # PORT = "8080"

    # logging vars & healthcheck
    REFORM_SERVICE_NAME = "${var.product}-${var.app_name}-${var.app_type}"
    REFORM_TEAM = "${var.team_name}"
    REFORM_SERVICE_TYPE = "${var.app_language}"
    REFORM_ENVIRONMENT = "${var.env}"

    PACKAGES_NAME = "${var.product}-${var.app_name}-${var.app_type}"
    PACKAGES_PROJECT = "${var.team_name}"
    PACKAGES_ENVIRONMENT = "${var.env}"

    ROOT_APPENDER = "${var.root_appender}"
    JSON_CONSOLE_PRETTY_PRINT = "${var.json_console_pretty_print}"
    LOG_OUTPUT = "${var.log_output}"

    # EM_API_URL = "http://${var.dm-store-app-url}-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
    IDAM_BASE_URL = "${var.idam-api-url}"
    IDAM_S2S_URL = "${var.s2s-url}"
    IDAM_SERVICE_KEY = "${var.idam-service-key}"
    IDAM_SERVICE_NAME = "${var.idam-service-name}"
    CORS_ORIGIN_METHODS = "${var.cors_origin_methods}"
    CORS_ORIGIN_WHITELIST = "${var.cors_origin_whitelist}"
  }
}

module "key-vault" {
  source = "git@github.com:contino/moj-module-key-vault?ref=master"
  product = "${var.product}-${var.app_name}-${var.app_type}"
  env = "${var.env}"
  tenant_id = "${var.tenant_id}"
  object_id = "${var.jenkins_AAD_objectId}"
  resource_group_name = "${module.app.resource_group_name}"
  product_group_object_id = "5d9cd025-a293-4b97-a0e5-6f43efce02c0"
}


# module "redis-cache" {
# source = "git@github.com:contino/moj-module-redis?ref=master"
# product = "${var.product}"
# location = "${var.location}"
# env = "${var.env}"
# subnetid = "${data.terraform_remote_state.core_apps_infrastructure.subnet_ids[2]}"
# }
