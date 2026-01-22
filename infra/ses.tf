resource "aws_ses_email_identity" "noreply" {
  email = "noreply@${var.domain}"
}

resource "aws_ses_domain_identity" "main" {
  domain = var.domain
}
