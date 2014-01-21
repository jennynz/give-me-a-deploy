#!/bin/bash

# Download and install puppet
gem install puppet
puppet module install --force puppetlabs/stdlib

# Remove firewalls to allow port forwarding
service iptables stop

# Install concat class for resource/vhost.pp:356
puppet module install ripienaar/concat

# Puppet install & boot nginx
puppet apply /vagrant/manifests/site.pp --modulepath=/vagrant/modules/:/etc/puppet/modules/

# Start the nginx server
service nginx start