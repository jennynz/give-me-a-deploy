$(document).ready(function(){

  $("#showvagrantInfo").click(function(){
    $("#vagrantInfo").toggle();
  });

  $("#showbootInfo").mouseenter(function(){
    $("#bootInfo").show();
  });
  $("#showbootInfo").click(function(){
    $("#bootInfo").hide();
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




  $("#showdevstackInfo").click(function(){
    $("#devstackInfo").toggle();
  });

  $("#showhpcloudInfo").click(function(){
    $("#hpcloudInfo").toggle();
  });

  $("#showemptyInfo").click(function(){
    $("#emptyInfo").toggle();
  });

});