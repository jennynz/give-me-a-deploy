function GenerateVagrantBoot(vmname) {
	return (
		"#!/bin/bash\n\n" +

		"# Directories created to be mirrored across to the /vagrant directory in the VM.\n" +
		"mkdir frontend\n" +
		"mkdir -p modules/solution\n" +
		"mkdir manifests\n\n" +

		"# Cloning required files from Stash.\n" +
		"git svn clone -rHEAD http://subversion/src/Orchestral/Framework/PlatformBuild/trunk\n" +
		"mv trunk PlatformBuild\n" +
		"mv PlatformBuild/ ./modules/\n\n" +

		"git clone ssh://git@stash:7999/ocd/tooling.git\n" +
		"mv tooling/ ./modules/\n\n" +

		"git clone ssh://git@stash:7999/puppet/puppet-ohp.git\n" +
		"mv puppet-ohp/ ./modules\n\n" +

		"# Boot up the VM\n" +
		"vagrant up"
	);
}



function GenerateVagrantfile(vmname) {
	// Get VM details from form.
	var os = document.getElementById("os").value;

	// Generate string variables.
	var box = os + "-x64-vbox4210-nocm";
	var boxurl =  "http://puppet-vagrant-boxes.puppetlabs.com/" + box + ".box";
	
	// Return code to be output into textbox
	return (
		"# -*- mode: ruby -*-\n" +
		"# vi: set ft=ruby :\n\n" +

		"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!\n" +
		"VAGRANTFILE_API_VERSION = '2'\n\n" +

		"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|\n\n" + 
		 
		"\t# Every Vagrant VM requires a box to build off of.\n" +
		"\tconfig.vm.box = '" + box + "'\n\n" + 

		"\t# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine.\n" + 
		"\tconfig.vm.box_url = '" + boxurl + "'\n\n" +

		"\t# Set the name of the host machine.\n" +
	  	"\tconfig.vm.hostname = '" + vmname + "'\n\n" + 

		"\t# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine.\n" + 
		"\tconfig.vm.network 'forwarded_port', guest: 19080, host: 19080\n\n" + 

		"\t# Set up VM and Puppet install OHP.\n" + 
	 	"\tconfig.vm.provision 'shell', path: 'install.sh'\n\n" + 

		"end"
	);	
}



function GenerateVagrantInstall(vmname) {
	// Get VM details to put in here as well

	return (
		"install megalong shell script here"
	);
}