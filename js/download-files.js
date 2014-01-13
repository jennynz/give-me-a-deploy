// Download Vagrant in a zip
function DownloadZip() {
  
  var boot = document.getElementById("vagrantenvbootsource").value;
  var vagrantfile = document.getElementById("vagrantenvvagrantfilesource").value;
  var install = document.getElementById("vagrantenvinstallsource").value;

  var zip = new JSZip();
  zip.file("boot.sh", boot);
  zip.file("Vagrantfile", vagrantfile);
  zip.file("install.sh", install);

  // data URI
  document.getElementById('dataURI').href = "data:application/zip;base64," + zip.generate();

  // Blob
  var blobLink = document.getElementById('blob');
  
  try {
    blobLink.download = "myVagrant.zip";
    blobLink.href = window.URL.createObjectURL(zip.generate({type:"blob"}));
  } catch(e) {
    blobLink.innerHTML += " (not supported on this browser)";
  }
};



// Download scripts as single files
function DownloadSourceCode(sourcelocation, filename) {

	var content = document.getElementById(sourcelocation).value;

	// If HTML5 compatible, do this.

		var pom = document.createElement('a');
		pom.setAttribute('href', 'data:application/plain;charset=utf-8,' + encodeURIComponent(content));
		pom.setAttribute('download', filename);
		pom.click();

	// Otherwise use data:URI which downloads it to a file called "download" (can't specify file name).

		// uriContent = "data:application/octet-stream," + encodeURIComponent(content);
		// newWindow = window.open(uriContent, 'neuesDokument');

}