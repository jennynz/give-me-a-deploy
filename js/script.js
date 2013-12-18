function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}



function DownloadSourceCode() {

	var content = document.getElementById("source").value;

	// If HTML5 compatible, do this.
	if (1 == 1) {
		var pom = document.createElement('a');
		pom.setAttribute('href', 'data:application/plain;charset=utf-8,' + encodeURIComponent(content));
		pom.setAttribute('download', 'Vagrantfile');
		pom.click();

	// Otherwise use data:URI which downloads it to a file called "download" (can't specify file name).
	} else {
		uriContent = "data:application/octet-stream," + encodeURIComponent(content);
		newWindow = window.open(uriContent, 'neuesDokument');
	}
}



function GetCode()
{
	// Check that the given VM name is valid.
	var vmname = ValidateVMName();

	// Specify the VM environment.
	vmenv = document.querySelector('input[name="vmenv"]:checked').value;

	// Generate complete vagrant script.
	vagrantcode = GenerateSourceCode(vmname, vmenv);

	// Print source code to textbox.
	PrintToTextbox(vagrantcode);

	// Save file as "Vagrantfile" to client's machine.
	/*if (document.vmdetails.savefile.checked) {
		SaveFile(vagrantcode);
	};*/

}



function ValidateVMName() {
	
	var vmname = document.getElementById("vmname").value;	// Get the vmname from the form.
	var nameStart = vmname[0].charCodeAt();	// Convert the first character into its ASCII code to check that it is valid.

	if ((nameStart == 45) || (nameStart == 46)) {
		alert("The hostname cannot start with a hyphen or dot.");
		document.getElementById("vmdetails").reset();
		return;
	}
	for (var i = 0; i < vmname.length; i++) {	// Check that each character in the name is valid.
		var nameCheck = vmname[i].charCodeAt();
		if (!(((nameCheck > 64) && (nameCheck < 91)) || ((nameCheck > 96) && (nameCheck < 123)) || ((nameCheck > 47) && (nameCheck < 58)) || ((nameCheck == 45) || (nameCheck == 46))  )) {
			alert("The hostname for the VM should only contain letters, numbers, hyphens or dots.\n It cannot start with a hyphen or dot.\n Please try again.");
			document.getElementById("vmdetails").reset();
			return;
		}
	}
	window.location = "#lower"; 	// Jump down to the textbox section.
	return vmname;
}



function GenerateSourceCode(vmname,vmenv)
{
	// Get VM details from form.
	var os = document.getElementById("os").value;

	if (vmenv=="vagrantenv") {

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
		"config.vm.box = " + box + '\n\n' + 

		"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine." + '\n' + 
		"config.vm.box_url = " + boxurl + '\n\n' +

		"# Set the name of the host machine." + '\n' +
	  	"config.vm.hostname = '" + vmname + "'" + '\n\n' + 

		"# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine." + '\n' + 
		"config.vm.network :forwarded_port, guest: 19080, host: 19080" + '\n\n' + 

		"# Install Puppet" + '\n' + 
	 	"config.vm.provision :shell, path: 'install_puppet.sh'" + '\n\n' + 

	 	"# Install OHP with Puppet modules" + '\n' + 
		"config.vm.provision :puppet do |puppet|" + '\n' + 
		"  puppet.module_path  = 'modules/puppet-ohp'" + '\n' +
		"  puppet.manifests_path = 'manifests'" + '\n' +
		"  puppet.manifest_file  = 'site.pp'" + '\n' + 
		"end" + '\n\n' +

		"end");

	} else if (vmenv=="devstackenv") {
		return ("DevStack source code to come!");


	} else if (vmenv=="hpcloudenv") {
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
	 	"config.vm.provision :shell, path: 'install_puppet.sh'" + '\n\n' + 

	 	"# Install OHP with Puppet modules" + '\n' + 
		"config.vm.provision :puppet do |puppet|" + '\n' + 
		"  puppet.module_path  = 'modules/puppet-ohp'" + '\n' +
		"  puppet.manifests_path = 'manifests'" + '\n' +
		"  puppet.manifest_file  = 'site.pp'" + '\n' + 
		"end" + '\n\n' +

		"end");

	} else if (vmenv=="emptyenv") {

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
		"config.vm.box = " + box + '\n\n' + 

		"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine." + '\n' + 
		"config.vm.box_url = " + boxurl + '\n\n' +

		"# Set the name of the host machine." + '\n' +
	  	"config.vm.hostname = '" + vmname + "'" + '\n\n' + 

		"# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine." + '\n' + 
		"config.vm.network :forwarded_port, guest: 19080, host: 19080" + '\n\n' + 

		"# Install Puppet" + '\n\n' + 

	 	"# Install OHP with Puppet modules" + '\n\n' + 

		"end");

	}

}



function PrintToTextbox(text) {
	var sourcetextbox = document.getElementById("source");
	sourcetextbox.value = text;
}



/*function SaveFile(text) {
	Likely that a server side language is required for this.

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var s = fso.CreateTextFile("vagrantfile.txt", true);
	s.WriteLine("# -*- mode: ruby -*-");
	s.WriteLine("# vi: set ft=ruby :\n");
	s.WriteLine("# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!")
	s.Close();
}*/