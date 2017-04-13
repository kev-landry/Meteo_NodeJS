
/*
 * *************************
 * Capteur : DHT11
 *
 * Les broches sont numérotées de la gauche vers la droite lorsque l'on regarde le capteur de face
 *
 * Broche n°1 connectée au +3.3V
 * Broche n°2 (data) connectée à  la broche 'D4' du NodeMcu (Pin 2 pour l'arduino) avec une résistance de 10 K reliée au +3.3v
 * Broche n°3 non connectée
 * Broche n°4 connectée à  la masse (GND)
 *
 * Installer la bibliothêque 'DHT sensor library by Adafruit'
 * Cette librairie necessite une librairie supplémentaire qui est disponible à  l'adresse : https://github.com/adafruit/Adafruit_Sensor
 * et qui doit être installée selon ce tutoriel : https://learn.adafruit.com/adafruit-all-about-arduino-libraries-install-use/installing-a-library-on-linux
 *
 */

// Déclaration des librairies
#include <DHT.h>
#include <DHT_U.h>                    // pour communiquer avec le capteur DHT
#include <ESP8266WiFi.h>              // pour le support du wifi
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>        // pour utliser le wifi

// Préparation du capteur DHT
#define DHTPIN 2                      // broche sur laquelle est raccordée la data du capteur (la broche 'D4' du NodeMcu correspond à la broche 2 de l'arduino)
#define DHTTYPE DHT11                 // précise la référence du capteur DHT (DHT11 ou DHT21 ou DHT22)
DHT dht(DHTPIN, DHTTYPE);             // Initialisation du capteur DHT

// Initialisation du wifi
ESP8266WiFiMulti WiFiMulti;

// fonction de démarrage
void setup() {

  // Démarrage du bus série
  Serial.begin(115200);               // vitesse
  Serial.println("Bonjour monde");          // écriture d'un petit message...
  Serial.println("");
  dht.begin();                        // Démarrage du capteur DHT11
  //WiFiMulti.addAP("xperia", "ccd5c43e0597"); // Connexion au réseau wifi
  //WiFiMulti.addAP("42-iphone", "fwimzb61edfk4");
  WiFiMulti.addAP("freebox", "031674E989");

}

// boucle infinie
void loop() {

  delay(60000);                        // attendre 20 secondes

  float t = dht.readTemperature();    // mesurer la température (en ° Celsius)
  float h = dht.readHumidity();       // mesurer l'humidité (en %)

  if (isnan(h) || isnan(t)) {         // test si des valeurs ont été récupérées

    // s'il y a un problème...

    Serial.println("Failed to read from DHT sensor!");    // affiche un message d'erreur
    return;                           // quitte pour retenter une lecture

  } else {

    // si tout va bien...

    // conversion des valeurs en entier
    int temp = int(t);
    int hum = int(h);

    // affichage des valeurs dans le bus série
    Serial.print("Temperature : ");
    Serial.print(temp);
    Serial.print(" *C\t");
    Serial.print("Humidité : ");
    Serial.print(hum);
    Serial.println(" %");

    // envoi des données vers internet
    if((WiFiMulti.run() == WL_CONNECTED)) {   // Si le wifi est connectée

          HTTPClient http;                    // préparation d'une requête HTTP au serveur

          Serial.println("HTTP begin... ");
          http.begin("http://164.132.194.226:8000/node/");   // connexion au serveur
      
          http.addHeader("Content-Type", "application/json");    // envoi d'un entête pour préciser notre format de données : json

          String value = "{\"temp\":\"" + String(temp)/*+"°C" */+ "\",\"hum\":\"" + String(hum)/*+"%" */+ "\"}";    // préparation du json {"temp":"22","hum":"55"}
          Serial.println(value);
          int httpCode = http.POST(value);    // envoi les données et récupére un code de retour
             
          if(httpCode == 200 ) {              // si le code de retour est bon (200)
             Serial.println("POST : ok");
          } else {                            // si le code de retour n'est pas bon (différent de 200)
             Serial.print("POST : failed, error : ");
             Serial.println(http.errorToString(httpCode).c_str());
          }
          http.end();                    // on ferme la connexion au serveur
    } else {
        Serial.println("problème de connexion au wifi");
    }
  }
}
