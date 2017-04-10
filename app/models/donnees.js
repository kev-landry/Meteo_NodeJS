var connection = require('./connection_db')

class Donnees {

// On utilisera ici des méthodes static donc commune entre toutes les instances de la classe "Donnees" si j'ai bien compris ?
    static insert(temp, hum, cb) {
        // -- Query similaire au prepare de PHP avec SET ?
        connection.query('INSERT INTO donnees SET temp = ?, hum = ?, time_ = ?', [temp, hum, new Date()], (err, result) => {
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
    static lastRecord(lastrecords, callback) {

        connection.query("SELECT * FROM donnees ORDER BY id DESC LIMIT " + lastrecords +"", (err, result) => {
            if (err) throw err

            callback(result)
        })
    }
    static dayRecord(cb) {

      while()
      connection.query("SELECT * FROM donnees WHERE DAY(time_) = "+ num + "", (err, result) => {
              if (err) throw err

              callback(result)
          })
    }

    static monthRecord(mois, callback) {

        var num = 0;
        switch (mois) {
            case "janvier":
                num = 1
                break;
            case "fevrier":
                num = 2
                break;
            case "mars":
                num = 3
                break;
            case "avril":
                num = 4
                break;
            case "mai":
                num = 5
                break;
            case "juin":
                num = 6
                break;
            case "juillet":
                num = 7
                break;
            case "août":
                num = 8
                break;
            case "septembre":
                num = 9
                break;
            case "octobre":
                num = 10
                break;
            case "novembre":
                num = 11
                break;
            case "decembre":
                num = 12
                break;
            default:
                 num = 4
        }
        console.log(num)
        connection.query("SELECT * FROM donnees WHERE MONTH(time_) = "+ num + "", (err, result) => {
                if (err) throw err

                callback(result)
            })
    }

    static range(debut, fin, callback) {
        connection.query("SELECT * FROM donnees WHERE time_ BETWEEN '" + debut + "' AND '" + fin + "' ", (err, result) => {
            if (err) throw err

            callback(result)
        })
    }
}
module.exports = Donnees
