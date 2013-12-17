function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}


function Deploy()
{
	// Check that the given VM name is valid.
	var vmname = ValidateVMName();

	// Check that the desired lifespan is between 0 and 96 hours max.
	var lifespan = document.getElementById("lifespan").value;

	if (lifespan != null) {
		ValidateLifespan(lifespan);
	}	

	// Go to Instance Panel
	window.location="deployed.html";

}



function ValidateLifespan(lifespan) {
	if (lifespan > 96) {
		alert("The maximum lifespan of the short-lived VM is 96 hours.");
		return;
	} else if (lifespan < 1) {
		alert("The lifespan of the VM must be at least 1 hour long.")
		return;
	}
}


function ValidateVMName() {
	
	var vmname = document.getElementById("vmname").value;	// Get the vmname from the form.
	var nameStart = vmname[0].charCodeAt();	// Convert the first character into its ASCII code to check that it is valid.

	if ((nameStart == 45) || (nameStart == 46)) {
		alert("The hostname cannot start with a hyphen or dot.");
		return;
	}
	for (var i = 0; i < vmname.length; i++) {	// Check that each character in the name is valid.
		var nameCheck = vmname[i].charCodeAt();
		if (!(((nameCheck > 64) && (nameCheck < 91)) || ((nameCheck > 96) && (nameCheck < 123)) || ((nameCheck > 47) && (nameCheck < 58)) || ((nameCheck == 45) || (nameCheck == 46))  )) {
			alert("The hostname for the VM should only contain letters, numbers, hyphens or dots.\n It cannot start with a hyphen or dot.\n Please try again.");
			return;
		}
	}
	window.location = "#lower"; 	// Jump down to the textbox section.
	return vmname;
}