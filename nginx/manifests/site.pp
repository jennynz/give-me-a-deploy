# Install and bootstrap an NGINX instance
class { 'nginx': }

# Setup a new virtual host
nginx::resource::vhost { 'give-me-a-deploy':
  ensure               => present,
  server_name          => ['give-me-a-deploy'],
  listen_port          => 19080,
  ssl                  => false,
  www_root             => '/vagrant/html',
  use_default_location => false,
  access_log           => '/var/log/nginx/rpm-repo_access.log',
  error_log            => '/var/log/nginx/rpm-repo_error.log',
}

# sudo service nginx start
# sudo service nginx stop

# default index when at 127.0.0.1:19080
# /usr/share/nginx/html/index.html

# sudo puppet apply /vagrant/manifests/site.pp --modulepath=/vagrant/modules/:/etc/puppet/modules/