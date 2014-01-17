$(document).ready(function(){

  // Show relevant form fields according to selected VM environment

  $('input:radio[name="vmenv"]').change(
    function(){
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

  // Provisionedenv individual script info

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