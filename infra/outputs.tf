output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.django_backend.id
}

output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_eip.django_backend.public_ip
}

output "s3_bucket_name" {
  description = "Name of the S3 media bucket"
  value       = aws_s3_bucket.media.bucket
}

output "ssh_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i ~/.ssh/django-deploy deploy@${aws_eip.django_backend.public_ip}"
}

output "ses_verification_token" {
  description = "SES domain verification token (add as TXT record in DNS)"
  value       = aws_ses_domain_identity.main.verification_token
}

output "secret_arn" {
  description = "ARN of the secrets manager secret"
  value       = aws_secretsmanager_secret.app_config.arn
}

output "ec2_django_role_arn" {
  description = "ARN of the secrets manager role"
  value       = aws_iam_role.ec2_django.arn
}

output "instance_profile_name" {
  description = "Name of the instance profile (for EC2)"
  value       = aws_iam_instance_profile.ec2_django.name
}