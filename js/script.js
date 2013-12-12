// Copy source code to clipboard
function clipboard() 
{
holdtext.innerText = copytext.innerText;
Copied = holdtext.createTextRange();
Copied.execCommand("Copy");
}

// Slider down to source code
$(document).ready(function(){
  $("#up").click(function(){
    $("#slide").slideUp("slow","swing");
  });
  $("#down").click(function(){
    $("#slide").slideDown("slow","swing");
  });
});