// Download Vagrant in a zip
function DownloadZip() {
  
  var run = document.getElementById("vagrantenvrunsource").value;
  var vagrantfile = document.getElementById("vagrantenvvagrantfilesource").value;
  var install = document.getElementById("vagrantenvinstallsource").value;

  var zip = new JSZip();
  zip.file("run.sh", run);
  zip.file("Vagrantfile", vagrantfile);
  zip.file("install.sh", install);

  // Blob for Chrome and Firefox v.20+
  var blobLink = document.getElementById('blob');
  
  try {
    blobLink.download = "myVagrant.zip";
    blobLink.href = window.URL.createObjectURL(zip.generate({type:"blob"}));
  } catch(e) {
    blobLink.innerHTML += " (not supported on this browser)";
  }
};