
var connection = require('./connection_db')

class Donnees {

  static create(temp,hum, cb){


    // -- Query similaire au prepare de PHP avec SET ?
    connection.query('INSERT INTO donnees SET temp = ?, hum = ?, date = ?', [temp, hum, new Date()], (err, result)=> { //Todo : date new date()
      if (err) throw err

      cb(result) //Le callback sa mère
    })
  }
}
module.exports = Donnees
