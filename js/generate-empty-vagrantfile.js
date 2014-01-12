function GenerateEmptyVagrantfile(vmname) {

	// Get VM details from form.
	var os = document.getElementById("os").value;
	
	// Generate string variables.
	var box = os + "-x64-vbox4210-nocm";
	var boxurl =  "http://puppet-vagrant-boxes.puppetlabs.com/" + box + ".box";
	
	// Return code to be output into textbox
	return ("# -*- mode: ruby -*-\n" +
	"# vi: set ft=ruby :\n\n" +

	"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!\n" +
	"VAGRANTFILE_API_VERSION = '2'\n\n" +

	"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|\n\n" + 

	"# Every Vagrant VM requires a box to build off of.\n" +
	"config.vm.box = '" + box + "'\n\n" + 

	"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine.\n" + 
	"config.vm.box_url = '" + boxurl + "'\n\n" +

	"# Set the name of the host machine.\n" +
  	"config.vm.hostname = '" + vmname + "'\n\n" + 

	"# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine.\n" + 
	"config.vm.network 'forwarded_port', guest: 19080, host: 19080\n\n" + 

	"end");
}