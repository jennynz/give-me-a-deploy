// Single-click select all text in source code textarea
function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}



// Generate and display customised source code
function GetCode()
{

	// Check that the given VM name is valid.
	var vmname = ValidateVMName();

	// Specify the VM environment.
	vmenv = document.querySelector('input[name="vmenv"]:checked').value;

	// Generate complete script(s) and print to respective textboxes.
	if (vmenv=="vagrantenv") {
		PrintToTextbox(GenerateVagrantBoot(), "vagrantenvboot");
		PrintToTextbox(GenerateVagrantfile(vmname), "vagrantenvvagrantfile");
		PrintToTextbox(GenerateVagrantInstall(), "vagrantenvinstall");
		
	} else if (vmenv=="devstackenv") {
		window.location = "#devstackcode";
		PrintToTextbox(GenerateDevStackScripts(), vmenv);
		
	} else if (vmenv=="hpcloudenv") {
		window.location = "#hpcloudcode";
		PrintToTextbox(GenerateHPCloudScripts(), vmenv);
		
	} else if (vmenv=="emptyenv") {
		window.location = "#emptycode";
		PrintToTextbox(GenerateEmptyVagrantfile(vmname), vmenv);
		
	}

}

function ValidateVMName() {
	
	var vmname = document.getElementById("vmname").value;	// Get the vmname from the form.

	if (vmname.length == 0) {
		vmname = "noName"; // No host name has been specified
	} else {

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
	}

	return vmname;
}

function PrintToTextbox(code, printlocation) {
	printlocation = printlocation + "source";
	var sourcetextbox = document.getElementById(printlocation);
	sourcetextbox.value = code;
}