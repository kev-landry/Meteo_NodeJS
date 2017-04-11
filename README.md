# Meteo_NodeJS

----Projet DTA -----

Construire une API capable de gérer des données météorologique.

Toutes les captures sont prises à une minute d'interval.

Routes :

- Obtenir toutes les données : /meteo/data/

- Obtenir la/les derniere-s donnée-s en date : /meteo/data/lastrecord/:nombre

-Obtenir un mois spécifique : /meteo/data/mois/:lemois

-Obtenir un jour spécifique (date au format YYYY-MM-DD) : /meteo/data/jour/:dateentière

-Obtenir une fourchette (date au format YYYY-MM-DD) : /meteo/data/:debut/:fin

Toutes les données retrournées sont au format JSON
