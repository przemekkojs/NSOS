terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.23"
    }

    http = {
      source = "hashicorp/http"
      version = "~> 3.5"
    }
  }

  required_version = ">= 1.2"
}

provider "aws" {
  region = "eu-central-1"
  profile = "nsos"
}

provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = "nsos"
}