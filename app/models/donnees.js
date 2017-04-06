var connection = require('./connection_db')

class Donnees {

    static create(temp, hum, cb) {
        // -- Query similaire au prepare de PHP avec SET ?
        connection.query('INSERT INTO donnees SET temp = ?, hum = ?, date = ?', [temp, hum, new Date()], (err, result) => {
            if (err) throw err

            cb(result) //Le callback sa mère
        })
    }

    static alldata(cb) {

        connection.query('SELECT * FROM donnees', (err, result) => {
            if (err) throw err

            cb(result)

        })
    }
    static lastRecord(cb) {

      connection.query('SELECT temp, humi FROM donnees ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) throw err

        cb(result)
      })
    }
    static dayRecord(cb) {

    }
    static monthRecord (cb){

    }
}
module.exports = Donnees
