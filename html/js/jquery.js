$(document).ready(function(){

/* ==========================================================================
    INDEX
   ========================================================================== */

  // Show relevant fields on form according to selected VM environment.
  $('input:radio[name="vmenv"]').change(function(){
    if ($(this).val() == 'emptyenv') {
      $("#email").hide();
      $("#products").hide();
      $("#puppetscripts").hide();
      $("#lifespan").hide();
      $("#generate").show();
      $("#deploy").hide();
    } else if ($(this).val() == 'provisionedenv') {
      $("#email").hide();
      $("#products").show();
      $("#puppetscripts").hide();
      $("#lifespan").hide();
      $("#generate").show();
      $("#deploy").hide();
    } else if ($(this).val() == 'hpcloudenv') {
      $("#email").show();
      $("#products").show();
      $("#puppetscripts").show();
      $("#lifespan").show();
      $("#generate").hide();
      $("#deploy").show();
    }
  });

  // Reset form completely, including resetting visible fields for the default VM environment.
  $("#reset").click(function(){
    $("#email").hide();
    $("#products").show();
    $("#puppetscripts").hide();
    $("#lifespan").hide();
    $("#generate").show();
    $("#deploy").hide();
  });

/* Provisioned VM section
   ============================== */

  // Toggle information on each individual script for a Provisioned VM.

  $("#show-run-info").click(function(){
    $("#run-info").toggle();
  });

  $("#show-vagrantfile-info").click(function(){
    $("#vagrantfile-info").toggle();
  });

  $("#show-install-info").click(function(){
    $("#install-info").toggle();
  });

/* Deployed section
   ============================== */

  // Initialize jQuery popup overlay function.
  $("#slidein").popup();

});

/* ==========================================================================
    DOCS
   ========================================================================== */
  
// Toggle tl;dr in Local Provisioned VM infobox
$("#show-tldr").click(function(){
  $("#tldr").toggle();
});