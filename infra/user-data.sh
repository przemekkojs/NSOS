#!/bin/bash

apt-get update
apt-get upgrade -y

apt-get install -y docker.io docker-compose git curl
systemctl enable docker
systemctl start docker

# Create deploy user
useradd -m -s /bin/bash deploy
usermod -aG docker deploy

# Setup SSH for deploy user
mkdir -p /home/deploy/.ssh
echo "${deploy_public_key}" > /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Create app directory
mkdir -p /opt/django
chown deploy:deploy /opt/django

# Install AWS CLI v2 for ECR login
cd /tmp
curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
rm -rf aws awscliv2.zip

# Setup swap (important for t4g.micro with 1GB RAM)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

echo "Setup complete!"