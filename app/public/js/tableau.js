$(document).ready(function() {
  // On récupère le json afin de mettre les données dans notre tableau
  $.getJSON('http://localhost:8000/meteo/data/lastrecords/10', function(json) {
    // On récupère les données dans des variables
    // var date = json[0]['time_'];
    // var temp = json[0]['temp']+"°C";
    // var hum = json[0]['hum']+"%";
    var date = [];
    var temp = [];
    var hum = [];

    //alert(date);

    // On construit le tableau
    var tableau = "<table class=\"table table-striped\">";
    tableau += "<thead><tr><th>Date du relevé</th><th>Température</th><th>Humidité</th></tr></thead><tbody>";

    if(json[0] != ""){
      for (var i in json) {
        date.push(json[i]['time_']);
        temp.push(json[i]['temp']);
        hum.push(json[i]['hum']);

        tableau += "<tr><td>" + json[i]['time_'] + "</td><td>" + json[i]['temp']+ "°C" + "</td><td>" + json[i]['hum']+ "%" + "</td></tr>";
      }
      tableau += "</tbody></table>";
      $('#tableau').append(tableau);
    } else {
        $('#tableau').html("<p>Une erreur s'est produite. Nous ne pouvons pas afficher les données.</p>");
      }
  });
});
