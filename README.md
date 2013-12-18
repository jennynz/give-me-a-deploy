Give-Me-A-Vagrant
=================

This is the development source code for a GUI web application which configures a Vagrantfile which can be booted up to provide a quick VM.
Currently, it is only able to output the source code for an empty VM provisioned with the selected OD and a custom VM name.

It will eventually be able to output not only a source code, but also a downloadable zip file which includes all the files required to provision the VM with Puppet, install OHP and configure it using Puppet scripts from svn.

Give-Me-A-Vagrant is entirely client-side, written in HTML, CSS and JS.

/give-me-a-deploy
----------------

The **directory "give-me-a-deploy"** holds files for a prototype skeleton of what a web app that actually spins up and automatically destroys short-lived VMs might look like. None of the functions currently work.

