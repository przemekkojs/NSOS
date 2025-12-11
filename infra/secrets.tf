resource "aws_secretsmanager_secret" "app_config" {
  name        = "prod/nsos/config"
  description = "Application configuration secrets"

  tags = {
    Environment = "production"
    Application = "nsos"
  }
}

resource "aws_secretsmanager_secret_version" "app_config" {
  secret_id = aws_secretsmanager_secret.app_config.id

  secret_string = jsonencode({
    SECRET_KEY        = var.django_secret_key
    DB_ENGINE         = var.database_engine
    DB_USER           = var.database_user
    DB_PASSWORD       = var.database_password
    DB_NAME           = var.database_name
    DB_HOST           = var.database_host
    DB_PORT           = var.database_port
    DEBUG             = "False"
    AWS_SES_SENDER    = var.aws_ses_sender
    AWS_SES_RECIPIENT = var.aws_ses_recipient
    AWS_REGION        = "eu-central-1"
    ALLOWED_HOSTS     = var.django_allowed_hosts
    FRONTEND_URL      = var.domain
  })
}

resource "aws_iam_policy" "read_secrets" {
  name        = "nsos-read-secrets"
  description = "Allow reading application secrets"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ]
        Resource = aws_secretsmanager_secret.app_config.arn
      },
      {
        Effect = "Allow"
        Action = [
          "kms:Decrypt"
        ]
        Resource = "*"
        Condition = {
          StringEquals = {
            "kms:ViaService" = "secretsmanager.eu-central-1.amazonaws.com"
          }
        }
      }
    ]
  })
}
