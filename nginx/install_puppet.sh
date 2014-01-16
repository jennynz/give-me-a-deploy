#!/bin/bash

# Download and install puppet
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y
sudo puppet module install --force puppetlabs/stdlib

# Remove firewalls to allow port forwarding
sudo service iptables stop