#!/bin/bash

# Shell script to be executed from the local machine

# Directories to be mirrored across to the /vagrant directory in the VM.
mkdir frontend
mkdir -p modules/solution # The name of this directory will eventually become the solution zip with the name $nameOfDirectory.zip
mkdir manifests

# Required directovaries for a solution package
git svn clone -rHEAD http://subversion/src/Orchestral/Framework/PlatformBuild/trunk
mv trunk PlatformBuild
mv PlatformBuild/ ./modules/

git clone ssh://git@stash:7999/ocd/tooling.git
mv tooling/ ./modules/

# git clone http://jennysa@stash/scm/~jamesha/bamboo-ohp-solution.git
# # Move only the build.xml into the folder named "solution". The three other required files will be written in the shell provisioning later.
# mv bamboo-ohp-solution/build.xml modules/solution
# # Delete redundant files
# rm -rf -- bamboo-ohp-solution

# Git clone Puppet modules and build.xml file for ant retrieve.
cd modules
git clone ssh://git@stash:7999/puppet/puppet-ohp.git
cd ..

vagrant up

# try putting tooling/ and solution/ in /vagrant, not modules/