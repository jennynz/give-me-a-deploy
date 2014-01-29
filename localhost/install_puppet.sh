#!/bin/bash

# Download and install puppet
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y

# Use Puppet to install nginx and dependencies
puppet module install --force puppetlabs/stdlib
puppet module install --force ripienaar/concat

# Remove firewalls to allow port forwarding
sudo service iptables stop