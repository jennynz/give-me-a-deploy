#!/bin/bash

# Directories created to be mirrored across to the /vagrant directory in the VM.
mkdir frontend
mkdir -p modules/solution
mkdir manifests

# Cloning required files from Stash.
git svn clone -rHEAD http://subversion/src/Orchestral/Framework/PlatformBuild/trunk
mv trunk PlatformBuild
mv PlatformBuild/ ./modules/

git clone ssh://git@stash:7999/ocd/tooling.git
mv tooling/ ./modules/

git clone ssh://git@stash:7999/puppet/puppet-ohp.git
mv puppet-ohp/ ./modules

# Boot up the VM
vagrant up