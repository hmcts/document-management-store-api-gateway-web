module "document-management-store-api-gateway-web" {
    source   = "git@github.com:contino/moj-module-webapp?ref=master"
    product  = "${var.product}-document-management-store-api-gateway-web"
    location = "${var.location}"
    env      = "${var.env}"
    ilbIp    = "${var.ilbIp}"

    app_settings = {
        # REDIS_HOST                   = "${module.redis-cache.host_name}"
        # REDIS_PORT                   = "${module.redis-cache.redis_port}"
        # REDIS_PASSWORD               = "${module.redis-cache.access_key}"
        RECIPE_BACKEND_URL           = "http://rhubarb-recipe-backend-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
        WEBSITE_NODE_DEFAULT_VERSION = "8.8.0"
    }
}

# module "redis-cache" {
#   source   = "git@github.com:contino/moj-module-redis?ref=master"
#   product  = "${var.product}"
#   location = "${var.location}"
#   env      = "${var.env}"
#   subnetid = "${data.terraform_remote_state.core_apps_infrastructure.subnet_ids[2]}"
# }
