$(document).ready(function() {
  // $.getJSON('http://localhost:8000/meteo/data/lastrecords/1', function(json) {
  //     alert(json[0]['temp']);
  // });
  $.ajax({
    url: "http://localhost:8000/meteo/data/lastrecords/1",
    type: "GET",
    dataType: 'json',

    error : function(data){
      console.log("Erreur");
      console.log(data);
      $('#date-temp').html("Nous ne pouvons pas afficher la dernière température en date.");
    },

    complete : function(data,statut){
      console.log(data);
      var affich = "Dernière température reçue : ";
      affich += data["responseJSON"][0]['temp']+"°C";
      $('#date-temp').html(affich);

      var affich2 = "Dernier taux d'humidité reçu : ";
      affich2 += data["responseJSON"][0]['hum']+"%";
      $('#date-hum').html(affich2);
    }
  });
});
