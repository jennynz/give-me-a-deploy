



// Change URL address into a string
var url = window.location
document.details.email.value = url

var email = document.vmdetails.email.value
var vmname = document.vmdetails.vmname.value

var test = "Hello world";
document.getElementById("VMName").value = test;

//if (some condition) {	do this } else { do that }


function clipboard() 
{
holdtext.innerText = copytext.innerText;
Copied = holdtext.createTextRange();
Copied.execCommand("Copy");
}