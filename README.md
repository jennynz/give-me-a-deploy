Give-Me-A-Vagrant
=================

Please refer to the Give-Me-A-Vagrant Docs or the Woki page for full details on this client-side GUI configurator for the Vagrant VM automation tool.

http://woki/display/IntDev/Give-Me-A-Vagrant

Prerequisites
-------------

For to be able to run the contents of this zip file, the following applications must be installed on your host machine:
- VirtualBox https://www.virtualbox.org/wiki/Downloads
	- Ensure that the version is compatible with Vagrant
- Vagrant http://www.vagrantup.com/
- Git version control http://git-scm.com/downloads

You must also have SSH key pairs set up with your Stash account, and permission to clone the following repositories:
- http://stash/projects/OCD/repos/tooling/browse
- http://stash/projects/PUPPET/repos/puppet-ohp/browse
- http://subversion/src/Orchestral/Framework/PlatformBuild/trunk

/give-me-a-deploy
----------------

The **directory "give-me-a-deploy"** holds files for a prototype skeleton of what a web app that actually spins up and automatically destroys short-lived VMs might look like.