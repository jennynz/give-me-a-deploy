# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

# Every Vagrant VM requires a box to build off of.
config.vm.box = 'centos-64-x64-vbox4210-nocm'

# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine.
config.vm.box_url = 'http://puppet-vagrant-boxes.puppetlabs.com/centos-64-x64-vbox4210-nocm.box'

# Set the name of the host machine.
config.vm.hostname = 'portal-vm'

# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine.
config.vm.network 'forwarded_port', guest: 19080, host: 19080

# Set up the environment for the automated Puppet installation of OHP.
config.vm.provision "shell", path: "setup.sh"

end