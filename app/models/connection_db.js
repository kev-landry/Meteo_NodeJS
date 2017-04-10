
//Fichier qui sert à se connection à la DB


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',  //'_8NaR*qg(7V2'
  database : 'meteo',
  socketPath: '/var/run/mysqld/mysqld.sock'
});

// Checker
connection.connect(function(err) {
 if (err) {
   console.error('error connecting: ' + err.stack);
   return;
 }
 console.log('connected as id ' + connection.threadId);
});
module.exports = connection //On exporte a chaque fois le module créé afin de le réutiliser
