Hosting Give-Me-A-Deploy on an HP Cloud instance
=====================

This process was initially automated using Bamboo, which would boot an HP Cloud instance provisioned with an NGINX server hosting the web app Give-Me-A-Vagrant using a Ruby API Binding. It is a start on a fully-fledged example of continuous delivery, where each commit would kick off some tests, and only if passed would the changes to the actual app (in ``html/``) be pushed live, all in an automated fashion.

To boot the HP Cloud instance from your local machine, call ```$ vagrant up```.

1. Calls [*Vagrantfile*](http://www.vagrantup.com/) to boot an Ubuntu VM provisioned with Nova (OpenStack command-line client). Nova is more compatible in a Unix environment, hence the booting of a Ubuntu VM so that users on all environments are able to run this script.

2. Runs the shell provisioning script *install_nova_client.sh* specified in the Vagrantfile to boot an instance on HP Cloud provisioned with nginx, and allocates it a floating IP so it can be accessed from outside the private network. It also syncs across the Give-Me-A-Deploy html files for nginx server to host.