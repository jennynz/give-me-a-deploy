function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}



function GetCode()
{
	// Get VM details
	var details = document.getElementById("vmdetails");
	var os = document.getElementById("os").value;
	var vmname = document.getElementById("vmname").value;

	// Check that the given VM name is valid.
	ValidateVMName(vmname);

	// Generate string variables.
	var box = os + "-x64-vbox4210-nocm";
	var boxurl =  "http://puppet-vagrant-boxes.puppetlabs.com/" + box + ".box";
	
	// Generate complete vagrant script.
	vagrantcode = GenerateSourceCode(box, boxurl, vmname);

	// Print source code to textbox.
	PrintToTextbox(vagrantcode);

	// Save file as "Vagrantfile" to client's machine.
	if (document.vmdetails.savefile.checked) {
		SaveFile(vagrantcode);
	};

}



function ValidateVMName(vmname)
{
	var nameStart = vmname[0].charCodeAt();
	if ((nameStart == 45) || (nameStart == 46)) {
		alert("The hostname cannot start with a hyphen or dot.");
		document.getElementById("vmdetails").reset();
		return;
	}

	for (var i = 0; i < vmname.length; i++) {	

		var nameCheck = vmname[i].charCodeAt();

		if (!(((nameCheck > 64) && (nameCheck < 91)) || ((nameCheck > 96) && (nameCheck < 123)) || ((nameCheck > 47) && (nameCheck < 58)) || ((nameCheck == 45) || (nameCheck == 46))  ))
		{
			alert("The hostname for the VM should only contain letters, numbers, hyphens or dots.\n It cannot start with a hyphen or dot.\n Please try again.");
			document.getElementById("vmdetails").reset();
			return;
		}
	}

	// Jump down to the textbox section.
	window.location = "#lower";

}



function GenerateSourceCode(box, boxurl, vmname)
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

	"# Set the name of the host machine." + '\n' +
  	"config.vm.hostname = \"" + vmname + "\"" + '\n\n' + 

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
	/*

	Likely that a server side language is required for this.

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var s = fso.CreateTextFile("vagrantfile.txt", true);
	s.WriteLine("# -*- mode: ruby -*-");
	s.WriteLine("# vi: set ft=ruby :\n");
	s.WriteLine("# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!")
	s.Close();*/
}