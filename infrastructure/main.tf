module "document-management-store-api-gateway-web" {
    source   = "git@github.com:contino/moj-module-webapp?ref=0.0.78"
    product  = "document-management-store-api-gateway-web"
    location = "${var.location}"
    env      = "${var.env}"
    asename  = "${data.terraform_remote_state.core_apps_compute.ase_name[0]}"

    app_settings = {
        RECIPE_BACKEND_URL           = "http://rhubarb-recipe-backend-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
        WEBSITE_NODE_DEFAULT_VERSION = "8.8.0"
    }
}
