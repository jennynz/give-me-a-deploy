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

		PrintToTextbox(GenerateVagrantRun(), "vagrantenvrun");
		PrintToTextbox(GenerateVagrantfile(vmname), "vagrantenvvagrantfile");
		PrintToTextbox(GenerateVagrantInstall(), "vagrantenvinstall");

		$('#vagrantenvsection').show();
      	$('#devstackenvsection, #hpcloudenvsection, #emptyenvsection').hide();
      	window.location = "#vagrantcode";

	} else if (vmenv=="devstackenv") {
		
		PrintToTextbox(GenerateDevStackScripts(), vmenv);
		
		$('#devstackenvsection').show();
      	$('#vagrantenvsection, #hpcloudenvsection, #emptyenvsection').hide();
		window.location = "#devstackcode";
		
	} else if (vmenv=="hpcloudenv") {
		
		PrintToTextbox(GenerateHPCloudScripts(), vmenv);

		$('#hpcloudenvsection').show();
      	$('#vagrantenvsection, #devstackenvsection, #emptyenvsection').hide();
		window.location = "#hpcloudcode";
		
	} else if (vmenv=="emptyenv") {
		
		PrintToTextbox(GenerateEmptyVagrantfile(vmname), vmenv);

		$('#emptyenvsection').show();
      	$('#vagrantenvsection, #devstackenvsection, #hpcloudenvsection').hide();
		window.location = "#emptycode";
		
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