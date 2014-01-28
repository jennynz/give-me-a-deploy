#!/bin/bash

BASE_URL='/opt/nginx'
mkdir ${BASE_URL}
cd ${BASE_URL}
mkdir modules
mkdir manifests

# Install puppet and download standard library, nginx and concat.
yum -y install puppet
puppet module install --force puppetlabs/stdlib
puppet module install --force jfryman/nginx
puppet module install --force ripienaar/concat

# Write out site.pp
cat > manifests/site.pp <<EOL
# Install and bootstrap an NGINX instance
class { 'nginx': }

# Setup a new virtual host
nginx::resource::vhost { 'give-me-a-deploy':
  ensure               => present,
  server_name          => ['give-me-a-deploy'],
  listen_port          => 80,
  listen_options			 => ['default_server'],
  ssl                  => false,
  www_root             => '/usr/share/nginx/html/',
  use_default_location => false,
  access_log           => '/var/log/nginx/rpm-repo_access.log',
  error_log            => '/var/log/nginx/rpm-repo_error.log',
}
EOL

# Remove firewalls to allow port forwarding
service iptables stop

# Puppet install & boot nginx
puppet apply manifests/site.pp

#rm -f /usr/share/nginx/html/index.html