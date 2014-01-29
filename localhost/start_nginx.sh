#!/bin/bash

# Download and install puppet
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y

# Use Puppet to install nginx and dependencies
puppet module install --force puppetlabs/stdlib
puppet module install --force jfryman/nginx
puppet module install --force ripienaar/concat

# Remove firewalls to allow port forwarding
sudo service iptables stop

# Puppet install & boot nginx
puppet apply /vagrant/manifests/site.pp --modulepath=/vagrant/modules/:/etc/puppet/modules/

# Move across files, overwrite index.html
mv -f /vagrant/html/* /usr/share/nginx/html/

# Copy across files, overwrite index.html
# cp -r -f /vagrant/html/* /usr/share/nginx/html/

# Restart NGINX
service nginx restart