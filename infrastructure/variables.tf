variable "product" {
    type = "string"
    default = "dm"
}

variable "app_name" {
    default = "api-gw"
}

variable "app_type" {
    default = "web"
}

variable "team_name" {
    default = "evidence"
}

variable "app_language" {
    default = "node"
}

variable "location" {
    type = "string"
    default = "UK South"
}

variable "env" {
    type = "string"
    description = "(Required) The environment in which to deploy the application infrastructure."
}

variable "subscription" {
    type = "string"
}

variable "ilbIp"{

}

variable "tenant_id" {

}

variable "jenkins_AAD_objectId" {
    type                        = "string"
    description                 = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

////////////////////////////////////////////////
//Addtional Vars ///////////////////////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
// Endpoints
////////////////////////////////////////////////
variable "idam_api_url" {
    default = "http://betaDevBccidamAppLB.reform.hmcts.net:80"
}

variable "s2s_url" {
    default = "http://betaDevBccidamS2SLB.reform.hmcts.net:80"
}

variable "dm_store_app_url" {
    default = "dm-store-app"
}

////////////////////////////////////////////////
// Logging
////////////////////////////////////////////////
variable "root_appender" {
    default = "JSON_CONSOLE"
}

variable "json_console_pretty_print" {
    default = "false"
}

variable "log_output" {
    default = "single"
}

////////////////////////////////////////////////
// Toggle Features
////////////////////////////////////////////////

////////////////////////////////////////////////
//// Whitelists
////////////////////////////////////////////////
variable "cors_origin_methods" {
    default = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
}
variable "cors_origin_whitelist" {
    default = "*"
}
////////////////////////////////////////////////
// Addtional
////////////////////////////////////////////////
variable "idam_service_key" {
    default = ""
}
variable "idam_service_name" {
    default = "em_gw"
}
