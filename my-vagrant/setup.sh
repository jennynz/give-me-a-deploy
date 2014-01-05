#!/bin/bash

##################################
# Setup Installation Environment #
##################################

# Remove firewalls to allow port forwarding
sudo service iptables stop

# Set up variables
portalversion = '8.4.0.beta';
foundationversion = '7.2.0.beta'; # Just use the most recent foundation version
baseurl = '/vagrant';
installer = 'platform-linux-x64.sh';

cd ${base_url}


# OHP Puppet Install configuration
# ================================

# Write to the site.pp file in /manifests to fill out the required config specs.
touch manifests/site.pp
cat > manifests/site.pp <<EOL
node default {
  class { 'ohp':
  	base_url => '${baseurl}',
  	installer => '${installer}',
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


# Provisioning installer
# ======================

# Download OHP provisioning installer from Ivy.
wget http://ivy-rep-ro/orchestral/provisioning-installer/${foundationversion}/installers/${installer} --user=ivy-http --password=YouSayHello
#wget http://ivy-http:YouSayHello@ivy-rep-ro/orchestral/provisioning-installer/7.2.0.beta/installers/platform-linux-x64.sh


# Solution zip
# ============

# Create and write the files required for a solution package
cd modules/solution
touch solutionVersion.yaml solution.properties version.properties build.xml

cat > solutionVersion.yaml <<EOL
ohp_applications:
  foundation: ${foundationversion}
  portal-deploy: ${portalversion}
puppet_modules:
  puppet-solution_test: 0.1.0.beta
EOL

cat > solution.properties <<EOL
solution.applications=foundation,portal-deploy
EOL

cat > version.properties <<EOL
version.major=0
version.minor=1
version.servicepack=0
EOL

cat > build.xml <<EOL
<project name="SolutionTest">
	<import file="../tooling/build-ocd-solution.xml"/>
</project>
EOL

cd #{baseurl}

# Create a solution.zip package downloaded from Ivy into the base url (the required files e.g. PlatformBuild, build.xml and tooling are copied across already).
JAVA_HOME=/opt/java1.7 ant create.custom.solution.package
ls -lh


# Ant Dependencies
# ================

# Install ant, retrieve dependencies in the puppet-ohp directory with the build.xml file.
sudo yum install ant -y
cd modules/puppet-ohp
ant retrieve.groovy.dependencies




##########################################
# Puppet install OHP with Puppet modules #
##########################################

# Download and install Puppet on the VM
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y
sudo puppet module install --force puppetlabs/stdlib

# Make the OHP provisioning installer executable.
chmod +x /vagrant/platform-linux-x64.sh

cd modules/puppet-ohp

# Run puppet install with specified module paths and manifest file.
sudo puppet module install --force puppetlabs/stdlib --modulepath=/vagrant/modules/puppet-ohp
puppet apply --modulepath=/vagrant/modules/puppet-ohp /vagrant/manifests/site.pp




#################################
# Check the installation of OHP #
#################################

sudo /opt/orionhealth/bin/server.sh start
sudo /opt/orionhealth/bin/server.sh status

sudo wget "http://localhost:19080/conductor"
sudo wget "http://localhost:19080/concerto"