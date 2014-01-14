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
    });

  // Show relevant sections for output source code

  $('#submit').click(function(){
    if ($('input:radio[name="vmenv"]').val() == 'devstackenv') {
      $('#vagrantenvsection').hide();
      $('#devstackenvsection').show();
      $('#hpcloudenvsection').hide();
      $('#emptyenvsection').hide();
    } else if ($('input:radio[name="vmenv"]').val() == 'hpcloudenv') {
      $('#vagrantenvsection').hide();
      $('#devstackenvsection').hide();
      $('#hpcloudenvsection').show();
      $('#emptyenvsection').hide();;
    } else if ($('input:radio[name="vmenv"]').val() == 'emptyenv') {
      $('#vagrantenvsection').hide();
      $('#devstackenvsection').hide();
      $('#hpcloudenvsection').hide();
      $('#emptyenvsection').show();
    }
  });

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