resource "aws_s3_bucket" "media" {
  bucket = "django-media-${var.environment}"

  tags = {
    Name = "Django Media Storage"
  }
}

resource "aws_s3_bucket_public_access_block" "media" {
  bucket = aws_s3_bucket.media.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_cors_configuration" "media" {
  bucket = aws_s3_bucket.media.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["https://api.${var.domain}", "https://${var.domain}"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}