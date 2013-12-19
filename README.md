Give-Me-A-Vagrant
=================

This is the development source code for a GUI web application which configures a Vagrantfile which can be booted up to provide a quick VM.
Currently, it is only able to output the source code for an empty VM provisioned with the selected OD and a custom VM name.

It will eventually be able to output not only a source code, but also a downloadable zip file which includes all the files required to provision the VM with Puppet, install OHP and configure it using Puppet scripts from svn.

Give-Me-A-Vagrant is entirely client-side, written in HTML, CSS and JS.

For a step-by-step article on installing platform with Puppet Apply, please see:
http://woki/display/IntDev/Installing+Platform+with+Puppet+Apply

Prerequisites
-------------

For to be able to run the contents of this zip file, the following applications must be installed on your host machine:
- VirtualBox https://www.virtualbox.org/wiki/Downloads
	- Ensure that the version is compatible with Vagrant
- Vagrant http://www.vagrantup.com/
- A bash-enabled terminal such as Git Bash http://git-scm.com/downloads
- Apache Ant http://ant.apache.org/bindownload.cgi
- Java Secure Channel http://sourceforge.net/projects/jsch/files/jsch.jar/0.1.50/jsch-0.1.50.jar/download
	- The downloaded jsch-0.1.50.jar file should be placed in the “lib” directory of the apache-ant directory.

Download required dependencies
------------------------------

Some sort of ant source build.xml file or something to download the things like solution.zip, puppet modules exported from svn, PlatformBuild, /frontend etc.

Might not even need to run a separate file, could maybe do it all with setup.sh from the initial shell provisioning in vagrant up!


Running 'vagrant up'
--------------------

If your line endings are set to Windows, they will have to be changed to Linux, or 'vagrant provision' will have to be run when the prompt is returned after 'vagrant up'.


/give-me-a-deploy
----------------

The **directory "give-me-a-deploy"** holds files for a prototype skeleton of what a web app that actually spins up and automatically destroys short-lived VMs might look like. None of the functions currently work.

