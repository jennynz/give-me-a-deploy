/* ==========================================================================
    INDEX
   ========================================================================== */

// Single-click select all text in source code textarea
function SelectAll(id) {
  document.getElementById(id).focus();
  document.getElementById(id).select();
}

/* ==========================================================================
    GENERATE SOURCE CODE
   ========================================================================== */

// Generate and display customised source code
function GetCode()
{

  // Check that input is valid.
  var vmname = ValidateVMName();
  
  // Specify the VM environment.
  vmenv = document.querySelector('input[name="vmenv"]:checked').value;
  
  // Generate complete script(s) and print to respective textboxes.
  if (vmenv=="provisionedenv") {
		PrintToTextbox(GenerateVagrantRun(), "provisionedenv-run");
		PrintToTextbox(GenerateVagrantfile(vmname), "provisionedenv-vagrantfile");
		PrintToTextbox(GenerateVagrantInstall(), "provisionedenv-install");
		$('#provisionedenv-section').show();
	  	$('#emptyenv-section').hide();
	  	window.location = "#vagrantcode";
  	
  } else if (vmenv=="emptyenv") {
		PrintToTextbox(GenerateEmptyVagrantfile(vmname), vmenv);
		$('#emptyenv-section').show();
	  	$('#provisionedenv-section').hide();
		window.location = "#emptycode";
  }

}

function ValidateVMName() {
	
	var vmname = document.getElementById("vmname").value;	// Get the vmname from the form.
	var nameStart = vmname[0].charCodeAt();	// Convert the first character into its ASCII code to check that it is valid.
	var nameCheck;

	if (vmname.length == 0) {
		vmname = "noName"; // No host name has been specified
	} else {

		if ((nameStart == 45) || (nameStart == 46)) {
			alert("The hostname cannot start with a hyphen or dot.");
			document.getElementById("vmdetails").reset();
			return;
		}

		for (var i = 0; i < vmname.length; i++) {	// Check that each character in the name is valid.
			nameCheck = vmname[i].charCodeAt();
			if (!(((nameCheck > 64) && (nameCheck < 91)) || ((nameCheck > 96) && (nameCheck < 123)) || ((nameCheck > 47) && (nameCheck < 58)) || ((nameCheck == 45) || (nameCheck == 46))  )) {
				alert("The hostname should only contain letters, numbers, hyphens or dots.\n It cannot start with a hyphen or dot.\n Please enter a valid hostname.");
				document.getElementById("vmdetails").reset();
				return;
			}
		}
	}
	return vmname;
}

function PrintToTextbox(code, printLocation) {
	printLocation = printLocation + "-source";
	var sourceTextbox = document.getElementById(printLocation);
	sourceTextbox.value = code;
}

/* ==========================================================================
    DEPLOY HP CLOUD INSTANCE
   ========================================================================== */

function Deploy() {

	var vmname = document.getElementById("vmname").value;
	var lifespan = document.getElementById("LifeSpan").value;

	// Check that input is valid.
	var lifespanIsValid = ValidateLifespan(lifespan);
	
	if (lifespanIsValid == 1) {
		alert("The following popup is only a mock-up of this feature.\n\nThe 'Provisioned VM on HP Cloud' option is yet to be developed.");
		
		// Add new deployed VM to table.
		$("#deployed-list").append(
			"<tr>" +
      "<td class='deployed-name'>" + vmname + "</td>" +
      "<td class='deployed-expiry'>" + lifespan + " hours</td>" +
      "<td class='deployed-options'>" +
      "<input type='button' class='button deployed-option' value='Retire'> " +
      "<input type='button' class='button deployed-option' value='Extend'>" +
      "</td>" +
      "</tr>"
    );
		
		// Show deployed VMs in popup overlay.
		$('#slidein').popup('show');
	}
}

function ValidateLifespan(lifespan) {
	if (lifespan > 96) {
		alert("The maximum lifespan of the short-lived VM is 96 hours.");
		return 0;
	} else if (lifespan < 1) {
		alert("The lifespan of the VM must be at least 1 hour long.");
		return 0;
	} else {
		return 1;
	}
}