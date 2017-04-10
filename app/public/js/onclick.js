$(document).ready(function() {
  $("#graphic-button").click(function() {
    $( "#graphic" ).replaceWith( "<div class='col-sm-9' id='graphic'></div>" );
    $( "#graphic-button" ).toggleClass( "active" );
    $( "#table-button" ).removeClass('active');
  });

  $("#table-button").click(function() {
    $( "#graphic" ).replaceWith( "<div class='col-sm-9'>TEST</div>" );
    $( "#table-button" ).toggleClass( "active" );
    $( "#graphic-button" ).removeClass('active');
  });
});
