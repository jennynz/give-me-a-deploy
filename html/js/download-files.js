// Download Vagrant in a zip
function DownloadZip() {
  
  var run = document.getElementById("provisionedenv-run-source").value;
  var vagrantfile = document.getElementById("provisionedenv-vagrantfile-source").value;
  var install = document.getElementById("provisionedenv-install-source").value;
  var readme = document.getElementById("readme").value;

  var vmname = document.getElementById("vmname").value;

  var zip = new JSZip();
  zip.file("run.sh", run);
  zip.file("Vagrantfile", vagrantfile);
  zip.file("install.sh", install);
  zip.file("README.md", readme);

  // Blob for Chrome and Firefox v.20+
  var blobLink = document.getElementById('blob');
  
  try {
    blobLink.download = vmname + ".zip";
    blobLink.href = window.URL.createObjectURL(zip.generate({type:"blob"}));
  } catch(e) {
    blobLink.innerHTML += " (not supported on this browser)";
  }
};

// Download scripts as single files (requires HTML5 compatibility)
function DownloadSourceCode(sourcelocation, filename) {
  var content = document.getElementById(sourcelocation).value;
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:application/plain;charset=utf-8,' + encodeURIComponent(content));
  pom.setAttribute('download', filename);
  pom.click();
};