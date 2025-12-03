# ------------ Bucket -------------
resource "aws_s3_bucket" "web_client" {
  bucket = "web-client-2"
  tags = {
    Name = "Web client"
  }
}

data "aws_iam_policy_document" "origin_bucket_policy" {
  statement {
    sid = "AllowCloudFrontServicePrincipalReadWrite"
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = ["s3:GetObject"]

    resources = [
      "${aws_s3_bucket.web_client.arn}/*"
    ]

    condition {
      test = "StringEquals"
      variable = "AWS:SourceArn"
      values = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "web_client" {
  bucket = aws_s3_bucket.web_client.bucket
  policy = data.aws_iam_policy_document.origin_bucket_policy.json
}

locals {
  s3_origin_id = "myS3Origin"
  nsos_domain = var.domain
}

data "aws_acm_certificate" "nsos_domain" {
  provider = aws.us_east_1
  domain = "*.${local.nsos_domain}"
  statuses = ["ISSUED"]
  most_recent = true
}

resource "aws_cloudfront_origin_access_control" "default" {
  name = "default-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior = "always"
  signing_protocol = "sigv4"
}

# ---------- Cloudfront -----------
data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.web_client.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id =  local.s3_origin_id
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  default_cache_behavior {
    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id
    compress = true

    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  ordered_cache_behavior {
    path_pattern = "/content/immutable/*"

    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.s3_origin_id
    compress = true

    min_ttl = 0
    default_ttl = 86400
    max_ttl = 31536000
  }

  ordered_cache_behavior {
    path_pattern     = "/content/*"

    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/404.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations = ["PL"]
    }
  }

  aliases = [local.nsos_domain]

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.nsos_domain.arn
    ssl_support_method = "sni-only"
  }
}

# data "aws_route53_zone" "nsos_domain" {
#   name = local.nsos_domain
# }

# resource "aws_route53_record" "cloudfront" {
#   for_each = aws_cloudfront_distribution.s3_distribution.aliases
#   zone_id = data.aws_route53_zone.nsos_domain.zone_id
#   name = each.value
#   type = "A"

#   alias {
#     name = aws_cloudfront_distribution.s3_distribution.domain_name
#     zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
#     evaluate_target_health = false
#   }
# }
