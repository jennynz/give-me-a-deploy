function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}

function GetCode()
{
	// Get VM details
	var details = document.getElementById("vmdetails");
	var os = document.getElementById("os").value;

	// Generate string variables.
	var box = os + "-x64-vbox4210-nocm";
	var boxurl =  "http://puppet-vagrant-boxes.puppetlabs.com/" + box + ".box"
	
	// Generate complete vagrant script.
	vagrantcode = GenerateSourceCode(box, boxurl);

	// Print source code to textbox.
	PrintToTextbox(vagrantcode);

	// Jump down to the textbox section.
	window.location = "#lower";

	// Save file as "Vagrantfile" to client's machine.
	if (document.vmdetails.savefile.checked) {

	}

}

function GenerateSourceCode(box, boxurl)
{
	return ("# -*- mode: ruby -*-" + '\n' +
	"# vi: set ft=ruby :" + '\n\n' +

	"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!" + '\n' +
	"VAGRANTFILE_API_VERSION = \"2\"" + '\n\n' +

	"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|" + '\n\n' + 

	"# Allocate the VM more memory" + '\n' + 
	"config.vm.provider :virtualbox do |vb|" + '\n' + 
	"  vb.customize [\"modifyvm\", :id, \"--memory\", \"1536\"]" + '\n' +
	"end" + '\n\n' + 
	 
	"# Every Vagrant VM requires a box to build off of." + '\n' +
	"config.vm.box = " + box + '\n\n' + 

	"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine." + '\n' + 
	"config.vm.box_url = " + boxurl + '\n\n' +

	"# Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine." + '\n' + 
	"config.vm.network :forwarded_port, guest: 19080, host: 19080" + '\n\n' + 

	"# Install Puppet" + '\n' + 
 	"config.vm.provision :shell, path: \"install_puppet.sh\"" + '\n\n' + 

 	"# Install OHP with Puppet modules" + '\n' + 
	"config.vm.provision :puppet do |puppet|" + '\n' + 
	"  puppet.module_path  = \"modules/puppet-ohp\"" + '\n' +
	"  puppet.manifests_path = \"manifests\"" + '\n' +
	"  puppet.manifest_file  = \"site.pp\"" + '\n' + 
	"end" + '\n\n' +

	"end");
}

function PrintToTextbox(text) {
	var sourcetextbox = document.getElementById("source");
	sourcetextbox.value = text;
}

function SaveFile(text) {

}