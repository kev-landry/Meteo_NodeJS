$(document).ready(function() {
  // Fonction AJAX qui récupère les dernières données à insérer dans l'en-tête du menu
  $.ajax({
    url: "http://localhost:8000/meteo/data/lastrecords/1",
    type: "GET",
    dataType: 'json',

    // Fonction si une erreur d'envoi de données se produit
    error : function(data){
      console.log("Erreur");
      console.log(data);
      $('#date-temp').html("Nous ne pouvons pas afficher la dernière température en date.");
    },

    complete : function(data,statut){
      console.log(data);
      var affich = "Dernière température reçue : ";
      affich += data["responseJSON"][0]['temp']+"°C"; // Chemin vers la donnée température
      $('#date-temp').html(affich);

      var affich2 = "Dernier taux d'humidité reçu : ";
      affich2 += data["responseJSON"][0]['hum']+"%";  // Chemin vers la donnée humidité
      $('#date-hum').html(affich2);
    }
  });
});
