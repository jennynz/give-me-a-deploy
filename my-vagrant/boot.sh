#!/bin/bash

# Shell script to be executed from the local machine

# Directories to be mirrored across to the VM.
mkdir frontend
mkdir -p modules/puppet-ohp
mkdir modules/solution # The name of this directory will eventually become the solution zip with the name $nameOfDirectory.zip
mkdir manifests

# SSH keys would be required so that the user isn't always prompted for the password.
# Required directories for a solution package
# git svn clone -rHEAD http://http://subversion/src/Orchestral/Framework/PlatformBuild/trunk
# mv trunk PlatformBuild
# mv PlatformBuild /vagrant/modules

git clone http://jennysa@stash/scm/ocd/tooling.git
mv tooling ./modules

# git clone http://jennysa@stash/scm/~jamesha/bamboo-ohp-solution.git
# # Move only the build.xml into the folder named "solution". The three other required files will be written in the shell provisioning later.
# mv bamboo-ohp-solution/build.xml modules/solution
# # Delete redundant files
# rm -rf -- bamboo-ohp-solution

# Git clone Puppet modules and build.xml file for ant retrieve.
cd modules/puppet-ohp
git clone http://jennysa@stash/scm/puppet/puppet-ohp.git
cd ..
cd ..

vagrant up