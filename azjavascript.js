$(document).ready(function(){
  $(".hide").hide();
  
 
  $(".icave").click(function(){
    $(".hide").hide();
    $(".cave-txt").fadeIn(600);
  });
  
  $(".ihorseman").click(function(){
    $(".hide").hide();
    $(".horseman-txt").fadeIn(600);
  });
  
});