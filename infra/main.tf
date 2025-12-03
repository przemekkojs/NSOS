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
          "${aws_s3_bucket.media.arn}/*"
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
  type = string
  default = "Django backend"
}

variable "instance_type" {
  description = "The EC2 instance's type."
  type = string
  default = "t4g.micro"
}

resource "aws_instance" "django_backend" {
  ami           = data.aws_ami.debian.id
  instance_type = var.instance_type

  root_block_device {
    volume_type = "gp3"
    volume_size = 30
    encrypted = true
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