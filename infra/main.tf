data "aws_ami" "debian" {
  most_recent = true

  filter {
    name   = "name"
    values = ["debian-12-arm64-*"]
  }

  # owners = ["099720109477"] # Canonical
  owners = ["136693071363"] # Debian
}

data "http" "myip" {
  url = "https://ipv4.icanhazip.com"
}

resource "aws_key_pair" "deployer" {
  key_name   = "django-deployer"
  public_key = var.deploy_public_key
}

resource "aws_iam_role" "ec2_django" {
  name = "ec2-django-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_s3_bucket" "artifacts" {
  bucket = "django-artifacts-bucket"
}


resource "aws_iam_policy" "django_s3_artifact" {
  name        = "github-actions-django-s3-artifact"
  description = "Allows GitHub Actions role to read/write deployment artifacts to S3"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3ArtifactRW"
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "${aws_s3_bucket.artifacts.arn}/deployment/*" # Targets the specific 'deployment' path
        ]
      },
      {
        Sid    = "S3List"
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.artifacts.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "django_s3_artifact" {
  role       = aws_iam_role.github_actions_django_deploy.name
  policy_arn = aws_iam_policy.django_s3_artifact.arn
}

resource "aws_iam_role_policy" "ec2_django_policy" {
  name = "ec2-django-policy"
  role = aws_iam_role.ec2_django.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.media.arn,
          "${aws_s3_bucket.media.arn}/*",
          aws_s3_bucket.artifacts.arn,
          "${aws_s3_bucket.artifacts.arn}/deployment/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_ssm_core" {
  role       = aws_iam_role.ec2_django.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ec2_django" {
  name = "ec2-django-profile"
  role = aws_iam_role.ec2_django.name
}

resource "aws_security_group" "django_backend" {
  name        = "django-backend-sg"
  description = "Security group for Django backend"

  vpc_id = data.aws_vpc.backend_vpc.id

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${chomp(data.http.myip.response_body)}/32"]
    description = "SSH access from PC"
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP access"
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS access"
  }

  # Outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound"
  }

  tags = {
    Name = "django-backend-sg"
  }
}

variable "instance_name" {
  description = "The EC2 Django instance's name."
  type        = string
  default     = "Django backend"
}

variable "instance_type" {
  description = "The EC2 instance's type."
  type        = string
  default     = "t4g.micro"
}

resource "aws_instance" "django_backend" {
  ami           = data.aws_ami.debian.id
  instance_type = var.instance_type
  key_name      = "admin-key-2025"

  iam_instance_profile = aws_iam_instance_profile.ec2_django.name

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 30
    encrypted             = true
    delete_on_termination = true
  }

  vpc_security_group_ids = [aws_security_group.django_backend.id]

  user_data = templatefile("${path.module}/user-data.sh", {
    deploy_public_key = var.deploy_public_key
  })

  tags = {
    Name = var.instance_name
  }
}

resource "aws_eip" "django_backend" {
  instance = aws_instance.django_backend.id
  domain   = "vpc"

  tags = {
    Name = "django-backend-eip"
  }
}

locals {
  aws_account_id = data.aws_caller_identity.current.account_id
}

# IAM Policy for ECR push access
resource "aws_iam_policy" "django_ecr_push" {
  name        = "github-actions-django-ecr-push"
  description = "Least privilege policy for pushing Django Docker images to ECR"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ECRLogin"
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
        ]
        Resource = "*" # ECR token generation is not resource-specific
      },
      {
        Sid    = "ECRWrite"
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
        Resource = "arn:aws:ecr:${var.aws_region}:${local.aws_account_id}:repository/${var.ecr_repository_name}"
      },
      {
        Sid    = "ECRRepositoryRead",
        Effect = "Allow",
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:DescribeImages"
        ]
        Resource = "arn:aws:ecr:${var.aws_region}:${local.aws_account_id}:repository/${var.ecr_repository_name}"
      }
    ]
  })
}

# IAM Policy for SSM Run Command access
resource "aws_iam_policy" "django_ssm_deploy" {
  name        = "github-actions-django-ssm-deploy"
  description = "Least privilege policy for running deployment commands via SSM"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "SSMSendCommand"
        Effect = "Allow"
        Action = "ssm:SendCommand"
        # Restrict to specific EC2 instance IDs if possible, or use a specific tag/resource ARN
        Resource = [
          "arn:aws:ec2:${var.aws_region}:${local.aws_account_id}:instance/${aws_instance.django_backend.id}",
          "arn:aws:ssm:${var.aws_region}::document/AWS-RunShellScript"
        ]
      },
      {
        Sid    = "SSMGetCommand"
        Effect = "Allow"
        Action = [
          "ssm:GetCommandInvocation",
          "ssm:ListCommands"
        ]
        Resource = "*"
      }
    ]
  })
}

# IAM Role for Django Deployment
resource "aws_iam_role" "github_actions_django_deploy" {
  name        = "github-actions-django-deploy"
  description = "Role for GitHub Actions to deploy Django app to ECR and EC2 via SSM"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_org}/${var.github_repo}:environment:production"
          }
        }
      }
    ]
  })

  tags = {
    Name = "github-actions-django-deploy"
  }
}

# Attach new policies to the new role
resource "aws_iam_role_policy_attachment" "django_ecr_push" {
  role       = aws_iam_role.github_actions_django_deploy.name
  policy_arn = aws_iam_policy.django_ecr_push.arn
}

resource "aws_iam_role_policy_attachment" "django_ssm_deploy" {
  role       = aws_iam_role.github_actions_django_deploy.name
  policy_arn = aws_iam_policy.django_ssm_deploy.arn
}

resource "aws_iam_role_policy_attachment" "ec2_read_secrets" {
  role       = aws_iam_role.ec2_django.name
  policy_arn = aws_iam_policy.read_secrets.arn
}


