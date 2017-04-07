var connection = require('./connection_db')

class Donnees {

    static create(temp, hum, cb) {
        // -- Query similaire au prepare de PHP avec SET ?
        connection.query('INSERT INTO donnees SET temp = ?, hum = ?, date = ?', [temp, hum, new Date()], (err, result) => {
            if (err) throw err

            cb(result) //Le callback sa mère
        })
    }

    static alldata(callback) {

        connection.query('SELECT * FROM donnees', (err, result) => {
            if (err) throw err

            callback(result)

        })
    }
    static lastRecord(callback) {

      connection.query('SELECT temp, hum FROM donnees ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) throw err

        callback(result)

      })
    }
    static dayRecord(cb) {

    }

    static monthRecord (cb){
      connection.query('SELECT temp, hum FROM donnees WHERE MONTH(temp) = 'month_number'', (err, result) => {
        if (err) throw err

        callback(result)

      })
    }

    static fourchette(callback){
      connection.query("SELECT * FROM post WHERE date BETWEEN '"+debut+"' AND '"+fin+"' ", (err, result) => {
        if (err) throw err


      })
    }
}
module.exports = Donnees
