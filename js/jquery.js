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

  // Info on HTML5 compatibility for downloading files separately.
  $("#showSaveInfo").mouseenter(function(){
    $("#hiddenSaveInfo").show();
  });

  $("#showSaveInfo").click(function(){
    $("#hiddenSaveInfo").hide();
    $("#emptyInfo").hide();
  });

  // Vagrantenv individual script info

  $("#showrunInfo").mouseenter(function(){
    $("#runInfo").show();
  });
  $("#showrunInfo").click(function(){
    $("#runInfo").hide();
  });

  $("#showvagrantfileInfo").mouseenter(function(){
    $("#vagrantfileInfo").show();
  });
  $("#showvagrantfileInfo").click(function(){
    $("#vagrantfileInfo").hide();
  });

  $("#showinstallInfo").mouseenter(function(){
    $("#installInfo").show();
  });
  $("#showinstallInfo").click(function(){
    $("#installInfo").hide();
  });

});