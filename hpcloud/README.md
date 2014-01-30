Hosting Give-Me-A-Deploy on an nginx server on an HP Cloud instance, booted from your local machine
=====================

Simply call ```$ vagrant up```.

1. Calls [*Vagrantfile*](http://www.vagrantup.com/) to boot an Ubuntu VM provisioned with Nova (OpenStack command-line client). Nova is more compatible in a Unix environment, hence the booting of a Ubuntu VM so that users on all environments are able to run this script.

2. Runs the shell provisioning script *install_nova_client.sh* specified  in the Vagrantfile to boot an instance on HP Cloud provisioned with nginx, and allocates it a floating IP so it can be accessed from outside the private network. It also syncs across the Give-Me-A-Deploy html files for nginx server to host.

Please see the Woki page [Hosting Give-Me-A-Deploy on an nginx server](http://woki/display/IntDev/Hosting+Give-Me-A-Deploy+on+an+nginx+server) for further information.