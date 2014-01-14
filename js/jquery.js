$(document).ready(function(){

  // Show relevant form fields according to selected VM environment

  $('input:radio[name="vmenv"]').change(
    function(){
      if ($(this).val() == 'emptyenv') {
        $("#email").hide();
        $("#products").hide();
        $("#puppetscripts").hide();
      } else if ($(this).val() == 'vagrantenv') {
        $("#email").hide();
        $("#products").show();
        $("#puppetscripts").hide();
      } else if ($(this).val() == 'devstackenv') {
        $("#email").show();
        $("#products").show();
        $("#puppetscripts").show();
      } else if ($(this).val() == 'hpcloudenv') {
        $("#email").show();
        $("#products").show();
        $("#puppetscripts").show();
      }
    }
  );

  // Subheader info for each environment's script output

  $("#showdevstackInfo").click(function(){
    $("#devstackInfo").toggle();
  });

  $("#showhpcloudInfo").click(function(){
    $("#hpcloudInfo").toggle();
  });

  $("#showemptyInfo").click(function(){
    $("#emptyInfo").toggle();
    $("#hiddenSaveInfo").hide();
  });

  // Vagrantenv individual script info

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