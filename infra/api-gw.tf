data "aws_vpc" "backend_vpc" {
    id = "vpc-0c9a751d074f373dc"
}

data "aws_subnet" "backend_subnet" {
    id = "subnet-0e5f7719ddb97ca06"
}

resource "aws_internet_gateway" "django_igw" {
  vpc_id = data.aws_vpc.backend_vpc.id

  tags = {
    Name = "django-backend-igw"
  }
}

resource "aws_route_table" "django_public_rt" {
  vpc_id = data.aws_vpc.backend_vpc.id

  tags = {
    Name = "django-public-rt"
  }
}

resource "aws_route" "public_internet_route" {
  route_table_id         = aws_route_table.django_public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.django_igw.id 
}

resource "aws_route_table_association" "django_subnet_association" {
  subnet_id      =  data.aws_subnet.backend_subnet.id
  route_table_id = aws_route_table.django_public_rt.id
}