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

	// Check that the formatting of Products is valid and that a version of foundation has been included.
	//ValidateProducts();

	// Specify the VM environment.
	vmenv = document.querySelector('input[name="vmenv"]:checked').value;

	// Generate complete script(s) and print to respective textboxes.
	if (vmenv=="vagrantenv") {
		window.location = "#vagrantcode";
		PrintToTextbox(GenerateVagrantBoot(vmname), "vagrantenvboot");
		PrintToTextbox(GenerateVagrantfile(vmname), "vagrantenvvagrantfile");
		PrintToTextbox(GenerateVagrantInstall(vmname), "vagrantenvinstall");
		
	} else if (vmenv=="devstackenv") {
		window.location = "#devstackcode";
		PrintToTextbox(GenerateDevStackScripts(vmname), vmenv);
		
	} else if (vmenv=="hpcloudenv") {
		window.location = "#hpcloudcode";
		PrintToTextbox(GenerateHPCloudScripts(vmname), vmenv);
		
	} else if (vmenv=="emptyenv") {
		window.location = "#emptycode";
		PrintToTextbox(GenerateEmptyVagrantfile(vmname), vmenv);
		
	}

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
	return vmname;
}

// function ValidateProducts() {

// 	// Get list of products and version numbers from form.
// 	var solutionVersion = document.getElementById("Products").value;

// 	// Check that the string starts with "ohp_applications:\n", then remove from front of string.
// 	var solutionApplications = solutionVersion.split("\n");
// 	if solutionApplications[0] != "ohp_applications:"
// 		alert("")

// 	.slice(1);

// 	// Split again into names and versions.
// 	var names = new Array();
// 	var versions = new Array();
// 	for (var i = 0; i < solutionApplications.length; i++) {
// 		var splitstr = solutionApplications[i].split(": ");
// 		names[i] = splitstr[0];
// 		versions[i] = splitstr[1];
// 	}

// 	// Check that a foundation version has been specified.
// 	var foundationIndex = names.indexOf("foundation");
// 	var foundationVersion = versions[foundationIndex];

// 	return();
// }


function PrintToTextbox(code, printlocation) {
	printlocation = printlocation + "source";
	var sourcetextbox = document.getElementById(printlocation);
	sourcetextbox.value = code;
}