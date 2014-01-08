
// String up the source code with the right customisation
function GenerateVagrantScripts(vmname,vmenv)
{
	// Get VM details from form.
	var os = document.getElementById("os").value;

	// Generate string variables.
	var box = os + "-x64-vbox4210-nocm";
	var boxurl =  "http://puppet-vagrant-boxes.puppetlabs.com/" + box + ".box";
	
	// Return code to be output into textbox
	return ("# -*- mode: ruby -*-" + '\n' +
	"# vi: set ft=ruby :" + '\n\n' +

	"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!" + '\n' +
	"VAGRANTFILE_API_VERSION = '2'" + '\n\n' +

	"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|" + '\n\n' + 

	"# Allocate the VM more memory" + '\n' + 
	"config.vm.provider :virtualbox do |vb|" + '\n' + 
	"  vb.customize ['modifyvm', :id, '--memory', '1536']" + '\n' +
	"end" + '\n\n' + 
	 
	"# Every Vagrant VM requires a box to build off of." + '\n' +
	"config.vm.box = '" + box + "'\n\n" + 

	"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine." + '\n' + 
	"config.vm.box_url = '" + boxurl + "'\n\n" +

	"# Set the name of the host machine." + '\n' +
  	"config.vm.hostname = '" + vmname + "'" + '\n\n' + 

	"# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine." + '\n' + 
	"config.vm.network 'forwarded_port', guest: 19080, host: 19080" + '\n\n' + 

	"# Run shell script to carry through to OHP installation" + '\n' + 
 	"config.vm.provision :shell, path: 'setup.sh'" + '\n\n' + 

	"end");
}

function GenerateDevStackScripts(vmname, vmenv) {
	return ("DevStack source code to come!");
}

function GenerateHPCloudScripts(vmname, vmenv) {
	return ("# -*- mode: ruby -*-" + '\n' +
	"# vi: set ft=ruby :" + '\n\n' +

	"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!" + '\n' +
	"VAGRANTFILE_API_VERSION = '2'" + '\n\n' +

	"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|" + '\n\n' + 

	"# Allocate the VM more memory" + '\n' + 
	"config.vm.provider :virtualbox do |vb|" + '\n' + 
	"  vb.customize ['modifyvm', :id, '--memory', '1536']" + '\n' +
	"end" + '\n\n' + 
	 
	"# Every Vagrant VM requires a box to build off of." + '\n' +
	"config.vm.box = 'dummy'" + '\n\n' + 

	"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine." + '\n' + 
	"config.vm.box_url = 'https://github.com/cloudbau/vagrant-openstack-plugin/raw/master/dummy.box'" + '\n\n' +

	"# Set the name of the host machine." + '\n' +
  	"config.vm.hostname = '" + vmname + "'" + '\n\n' + 

	"config.vm.provider :openstack do |os|" + '\n' +
	    "os.username = ENV['OS_USERNAME']" + '\n' +
	    "os.api_key  = ENV['OS_PASSWORD']" + '\n' +
	    "os.tenant   = ENV['OS_TENANT_NAME']" + '\n' +
	    "os.endpoint = \"#{ENV['OS_AUTH_URL']}/tokens\"" + '\n\n' +

	    "os.keypair_name = keypair_name" + '\n' +
	    "os.ssh_username = 'root'" + '\n\n' +

	    "os.flavor   = 'standard.small'" + '\n' +
	    "os.image    = '78265' # CentOS 6.3" + '\n\n' +

	    "os.address_id = 'private' # Chooses the 15.x.x.x range 'private IP' over the 10.x.x.x address" + '\n\n' +

		"hostname = `hostname`.chomp" + '\n' +
	    "os.server_name = '#{hostname}-vagrant'" + '\n\n' +

	    "# Workaround until Vagrant 1.4 is released - https://github.com/mitchellh/vagrant/issues/1482" + '\n' +
	    "os.user_data = File.read('user-data.txt')" + '\n' +
	"end" + '\n\n' +

	"# Install Puppet" + '\n' + 
 	"config.vm.provision :shell, path: 'setup.sh'" + '\n\n' + 

 	"# Install OHP with Puppet modules" + '\n' + 
	"config.vm.provision :puppet do |puppet|" + '\n' + 
	"  # puppet.options = '--verbose --debug'" + '\n' +
	"  puppet.module_path  = 'modules/puppet-ohp'" + '\n' +
	"  puppet.manifests_path = 'manifests'" + '\n' +
	"  puppet.manifest_file  = 'site.pp'" + '\n' + 
	"end" + '\n\n' +

	"end");
}

function GenerateEmptyVagrantfile(vmname, vmenv) {

		// Generate string variables.
		var box = os + "-x64-vbox4210-nocm";
		var boxurl =  "http://puppet-vagrant-boxes.puppetlabs.com/" + box + ".box";
		
		// Return code to be output into textbox
		return ("# -*- mode: ruby -*-" + '\n' +
		"# vi: set ft=ruby :" + '\n\n' +

		"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!" + '\n' +
		"VAGRANTFILE_API_VERSION = '2'" + '\n\n' +

		"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|" + '\n\n' + 

		"# Every Vagrant VM requires a box to build off of." + '\n' +
		"config.vm.box = '" + box + "'\n\n" + 

		"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine." + '\n' + 
		"config.vm.box_url = '" + boxurl + "'\n\n" +

		"# Set the name of the host machine." + '\n' +
	  	"config.vm.hostname = '" + vmname + "'\n\n" + 

		"# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine." + '\n' + 
		"config.vm.network 'forwarded_port', guest: 19080, host: 19080" + '\n\n' + 

		"end");
}
