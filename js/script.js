// Single-click select all text in source code textarea
function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}



// Download Vagrantfile in a zip
function DownloadZip() {
  
  var content = document.getElementById("source").value;

  var zip = new JSZip();
  zip.file("Vagrantfile", content);

  // data URI
  document.getElementById('dataURI').href = "data:application/zip;base64," + zip.generate();

  // Blob
  var blobLink = document.getElementById('blob');
  
  // If vmenv == 'vagrantenv', download along with setup.sh and vagrantupforme.sh

  try {
    blobLink.download = "here-is-your-vagrant.zip";
    blobLink.href = window.URL.createObjectURL(zip.generate({type:"blob"}));
  } catch(e) {
    blobLink.innerHTML += " (not supported on this browser)";
  }
};



// Download Vagrantfile as a single file
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



// Generate and display customised source code
function GetCode()
{
	// Check that the given VM name is valid.
	var vmname = ValidateVMName();

	// Specify the VM environment.
	vmenv = document.querySelector('input[name="vmenv"]:checked').value;

	// Generate complete script(s).
	if (vmenv=="vagrantenv") {vagrantcode = GenerateVagrantScripts(vmname, vmenv);}
	else if (vmenv=="devstackenv") {vagrantcode = GenerateDevStackScripts(vmname, vmenv);}
	else if (vmenv=="hpcloudenv") {vagrantcode = GenerateHPCloudScripts(vmname, vmenv);}
	else if (vmenv=="emptyvagrant") {vagrantcode = GenerateEmptyVagrantfile(vmname, vmenv);}

	// Print source code to textbox.
	PrintToTextbox(vagrantcode);
}



// Check that the given VM name is valid
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


// Display generated source code in texarea
function PrintToTextbox(text) {
	var sourcetextbox = document.getElementById("source");
	sourcetextbox.value = text;
}