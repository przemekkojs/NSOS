variable "environment" {
  description = "Environment (dev/staging/prod)"
  type        = string
  default     = "prod"
}

variable "domain" {
  description = "Domain for the application"
  type        = string
}

variable "deploy_public_key" {
  description = "Public SSH key for deploy user"
  type        = string
}

variable "django_secret_key" {
  description = "Django SECRET_KEY"
  type        = string
  sensitive   = true
}

variable "database_engine" {
  description = "Database engine"
  type        = string
  default     = "postgresql"
}

variable "database_user" {
  description = "Database user"
  type        = string
}

variable "database_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "nsos"
}

variable "database_host" {
  description = "Database host"
  type        = string
}

variable "database_port" {
  description = "Database port"
  type        = number
  default     = 5432
}

variable "django_allowed_hosts" {
  description = "Django allowed hosts"
  type        = string
}

# SES
variable "aws_ses_sender" {
  description = "AWS SES Sender"
  type        = string
}

variable "aws_ses_recipient" {
  description = "AWS SES Recipient"
  type        = string
}

# GitHub OIDC
variable "github_org" {
  description = "GitHub organization"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 Bucket to send Nuxt application to"
  type        = string
}

variable "aws_region" {
  description = "Default AWS region"
  type        = string
}

variable "cloudfront_distribution_id" {
  description = "Cloudfront distribution for Nuxt app"
  type        = string
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
}