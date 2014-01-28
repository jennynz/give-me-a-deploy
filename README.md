Continuously Delivering Give-Me-A-Deploy on Bamboo
==================================================

This directory contains the files for the Bamboo plan [Give-Me-A-Deploy on HP Cloud](http://bamboo/browse/ATT-GMAD) which aims to boot an HP Cloud instance provisioned with an NGINX server hosting the web app Give-Me-A-Vagrant, using a Ruby API Binding.

Give-Me-A-Deploy
----------------

Please refer to the Give-Me-A-Deploy Docs or the [Woki page](http://woki/display/IntDev/Give-Me-A-Deploy) for full details on this client-side GUI configurator for the Vagrant VM automation tool.

Prerequisites
-------------

For to be able to run the contents of this zip file, the following applications must be installed on your host machine:
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
	* Ensure that the version is compatible with Vagrant
* [Vagrant](http://www.vagrantup.com/)
* [Git version control](http://git-scm.com/downloads)

You must also have SSH key pairs set up with your Stash account, and permission to clone the following repositories:
* http://stash/projects/OCD/repos/tooling/browse
* http://stash/projects/PUPPET/repos/puppet-ohp/browse
* http://subversion/src/Orchestral/Framework/PlatformBuild/trunk