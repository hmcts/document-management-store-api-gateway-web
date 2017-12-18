variable "product" {
  type    = "string"
  default = "document-management-store-api-gateway-web"
}

variable "location" {
  type    = "string"
  default = "UK South"
}

variable "env" {
  type = "string"
}

variable "ssenv" {
  type = "string"
  default = "prd"
}

variable "ilbIp"{}
