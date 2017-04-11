$(document).ready(function() {
  $("#graphic-button").click(function() {
    $("#graphic-button").toggleClass("active");
    $("#table-button").removeClass('active');
  });

  $("#table-button").click(function() {
    $("#table-button").toggleClass("active");
    $("#graphic-button").removeClass('active');
  });
});
