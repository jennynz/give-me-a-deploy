#!/bin/bash

# Copy across files, overwrite index.html
sudo cp -r -f /vagrant/html/* /usr/share/nginx/html/

# Restart NGINX
sudo service nginx restart