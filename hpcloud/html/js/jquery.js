$(document).ready(function(){

/* ==========================================================================
    MAIN FORM
   ========================================================================== */

  // Show relevant fields on form according to selected VM environment.
  $('input:radio[name="vmenv"]').change(function(){
    if ($(this).val() == 'emptyenv') {
      $("#email").hide();
      $("#products").hide();
      $("#puppetscripts").hide();
      $("#lifespan").hide();
    } else if ($(this).val() == 'provisionedenv') {
      $("#email").hide();
      $("#products").show();
      $("#puppetscripts").hide();
      $("#lifespan").hide();
    } else if ($(this).val() == 'devstackenv') {
      $("#email").show();
      $("#products").show();
      $("#puppetscripts").show();
      $("#lifespan").show();
    } else if ($(this).val() == 'hpcloudenv') {
      $("#email").show();
      $("#products").show();
      $("#puppetscripts").show();
      $("#lifespan").show();
    }
  });

  // Reset form completely, including resetting visible fields for the default VM environment.
  $("#reset").click(function(){
    $("#email").hide();
    $("#products").show();
    $("#puppetscripts").hide();
    $("#lifespan").hide();
  });

/* ==========================================================================
    PROVISIONED VM SECTION
   ========================================================================== */

  // Toggle information on each individual script for a Provisioned VM.

  $("#showrunInfo").click(function(){
    $("#runInfo").toggle();
  });

  $("#showvagrantfileInfo").click(function(){
    $("#vagrantfileInfo").toggle();
  });

  $("#showinstallInfo").click(function(){
    $("#installInfo").toggle();
  });

});