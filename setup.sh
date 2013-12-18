#!/bin/bash


# http://woki/display/IntDev/Installing+Platform+with+Puppet+Apply
# http://bamboo/build/admin/edit/editBuildTasks.action?buildKey=CPO-PAO-PIO
# This is all happening inside the vagrant, but the files in the installation directory should be mirrored across into the Vagrant directory.
# If this doesn't work so well, a totally separate shell/executable/ant file will have to be made which does all this in the Vagrant directory on the host.


# Download and install puppet
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y
sudo puppet module install --force puppetlabs/stdlib

# Remove firewalls to allow port forwarding
sudo service iptables stop

# Download OHP provisioning installer from Ivy.
wget http://ivy-rep-ro/orchestral/provisioning-installer/7.2.0.beta/installers/platform-linux-x64.sh --user=ivy-http --password=YouSayHello

# Download and create a solution.zip from Ivy (with foundation and portal-deploy in it, the versions must be customisable rememmber)
cd /build/work/CPO-PAO-PIO/solutionVersions
# Create Solution Zip
JAVA_HOME=/opt/java1.7 ant create.custom.solution.package #default is the outdated 1.6version (con4)
ls -lh
mv solutionVersions.zip solution.zip
mv solution.zip /build/work/CPO-PAO-PIO/

# Download installer
cd /build/work/CPO-PAO-PIO/
wget http://ivy-http:YouSayHello@ivy-rep-ro/orchestral/provisioning-installer/7.2.0.beta/installers/platform-linux-x64.sh

# Git clone the PlatformBuild repository into /modules/PlatformBuild
git svn clone -rHEAD http://subversion/src/Orchestral/Framework/PlatformBuild/trunk ./modules/PlatformBuild

# Get Puppet module for OHP
mkdir modules
mv PlatformBuild puppet-ohp /modules
cd modules/puppet-ohp
ant retrieve.groovy.dependencies

# Make the required directories.
mkdir frontend
mkdir manifests
cd manifests
touch site.pp
# Edit site.pp to define teh parametered shown blablababl

# 
cd modules
ant retrieve.groovy.dependencies
mv trunk PlatformBuild
cd ..

