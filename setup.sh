#!/bin/bash

##################################
# Setup Installation Environment #
##################################

# Download and install puppet
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y
sudo puppet module install --force puppetlabs/stdlib

# Remove firewalls to allow port forwarding
sudo service iptables stop

# Variables
portalversion = '8.4.0.beta';
foundationversion = '7.2.0.beta'; # Just use the most recent foundation version
baseurl = '/vagrant';

cd #{baseurl}

# Download OHP provisioning installer from Ivy.
wget http://ivy-rep-ro/orchestral/provisioning-installer/${foundationversion}/installers/platform-linux-x64.sh --user=ivy-http --password=YouSayHello

# Specify the solution version in the yaml file.
touch solutionVersion.yaml
cat > solutionVersion.yaml <<EOL
ohp_applications:
  foundation: ${foundationversion}
  portal-deploy: 8.4.0.final
puppet_modules:
  puppet-solution_test: 0.1.0.beta
EOL

# Download and create a solution.zip from Ivy (with foundation and portal-deploy in it, the versions must be customisable rememmber)
# Create Solution Zip
JAVA_HOME=/opt/java1.7 ant create.custom.solution.package #default is the outdated 1.6version (con4)
ls -lh
mv solutionVersions.zip solution.zip
mv solution.zip /vagrant

# Download installer
wget http://ivy-http:YouSayHello@ivy-rep-ro/orchestral/provisioning-installer/7.2.0.beta/installers/platform-linux-x64.sh

# Get OHP Puppet modules
mkdir -p modules/puppet-ohp

# !! Git clone the PlatformBuild repository into /modules/PlatformBuild
git svn clone -rHEAD http://subversion/src/Orchestral/Framework/PlatformBuild/trunk ./modules/PlatformBuild

mv PlatformBuild puppet-ohp modules
cd modules/puppet-ohp

# Install ant, retrieve dependencies
sudo yum install puppet -y
# There needs to be a build.xml file in the directory for ant to work
ant retrieve.groovy.dependencies
mv trunk PlatformBuild

# Write the site.pp file in /manifests to fill out the required config specs.
mkdir manifests
touch manifests/site.pp
cat > manifests/site.pp <<EOL
node default {
  class { 'ohp':
  	base_url => '${baseurl}',
  	installer => 'platform-linux-x64.sh',
  	node_type => 'frontend',
  	group_name => 'my_group',
  	group_mode => 'standalone',
  	applications => ['portal-deploy', 'foundation'],
  	application_versions => { 'portal-deploy' => '${portalversion}', 'foundation' => '${foundationversion}' },
  	install_dir => '/opt/orionhealth',
  	admin_password => 'b',
  }
}
EOL

# Other random directories which might be needed
mkdir frontend


##########################################
# Puppet install OHP with Puppet modules #
##########################################

# Make the OHP provisioning installer executable.
chmod +x /tmp/platform-linux-x64.sh

cd modules/puppet-ohp

# Run puppet install with specified module paths and manifest file.
sudo puppet module install --force puppetlabs/stdlib --modulepath=/tmp/modules/puppet-ohp
puppet apply --modulepath=/tmp/modules/puppet-ohp /tmp/manifests/site.pp


#################################
# Check the installation of OHP #
#################################

sudo /opt/orionhealth/bin/server.sh start
sudo /opt/orionhealth/bin/server.sh status

sudo wget "http://localhost:19080/conductor"
sudo wget "http://localhost:19080/concerto"