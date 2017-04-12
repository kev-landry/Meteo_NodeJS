$(document).ready(function()
{
  // On appelle la fonction tableau pour le faire apparaitre
  constructionTableau();
  // On assigne le tableau aux boutons pour refresh
  $('#refresh').click(function()
  {
    $('#tableau>*').remove();
    constructionTableau();
  });
  $('#table-button').click(function()
  {
    $('#tableau>*').remove();
    constructionTableau();
  });
});

/* Fonction permettant de modifier l'écriture de la date qui s'affiche dans le tableau */
function formatDate(str)
{
  str = str.replace("T"," à ");    // remplace le "T" contenu dans le json par un "à"
  str = str.replace(":"," h ");    // remplace le ":" contenu dans le json par un "h"
  var res = str.substring(0, 20);  // on garde 20 valeurs du tableau en partant de 0 supprime les autres valeurs
  return res;
}

function constructionTableau()
{
  // On récupère le json afin de mettre les données dans notre tableau
  $.getJSON('http://localhost:8000/meteo/data/lastrecords/10', function(json)
  {
    // On récupère les données dans des variables
    var date = [];
    var temp = [];
    var hum = [];

    //alert(date);

    // On construit le tableau
    var tableau = "<table class=\"table table-responsive table-bordered table-striped text-center\">";
    tableau += "<thead><tr><th class=\"text-center\">Date du relevé</th><th class=\"text-center\">Température</th><th class=\"text-center\">Humidité</th></tr></thead><tbody>";

    // On parcourt le json
    if(json[0] != "")
    {
      for (var i in json)
      {
        date.push(json[i]['time_']); // On ajoute les données à la fin du tableau
        temp.push(json[i]['temp']);
        hum.push(json[i]['hum']);

        // On construit les lignes du tableau contenant les données
        // On appelle la fonction formatDate() pour donner à la date une forme plus conventionnelle
        tableau += "<tr><td>" + formatDate(json[i]['time_']) + "</td><td>" + json[i]['temp']+ "°C" + "</td><td>" + json[i]['hum']+ "%" + "</td></tr>";
      }
      tableau += "</tbody></table>";
      $('#tableau').append(tableau); // On introduit le tableau dans la div
    }
    else
    {
      $('#tableau').html("<p>Une erreur s'est produite. Nous ne pouvons pas afficher les données.</p>");
    }
  });
}
