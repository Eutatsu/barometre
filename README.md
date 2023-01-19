# Baròmetre Universitari

Applicació creada per:
* [Oriol Segura](https://twitter.com/uriiisegura)
* [Andreu Huguet](https://twitter.com/HuguetAndreu)

## On són les dades?

La base de dades és un [Google Spreadsheet](https://docs.google.com/spreadsheets/d/105YLYfRNPUvhx6G8QUkZykGPHPTpzCk6WO5zBGV2LcA/). Si hi voleu col·laborar o coneixeu d'algú que hi vulgui ajudar, intenteu contactar amb nosaltres.

### Col·laboradors actuals per colla

Un dels objectius del Baròmetre Universitari és recollir totes les actuacions universitàries de la història. Estem contactant amb gent de totes les colles per tal de recollir tots els castells, colla per colla.

Tenim ja col·laboradors en algunes colles, però no en totes:

* __Arreplegats__: Oriol Segura, Andreu Huguet.
* __Trempats__: Gabriel Puig.
* __Penjats__: Jordi Orive.

Voldries ajudar-nos? Contacta'ns per [Twitter](https://twitter.com/BarometreUni) o [correu electrònic](mailto:barometreuniversitari@gmail.com).

## Com funciona?

És una aplicació web feta en `React`, per tant, haurem de tenir `npm` instal·lat.

Per a instal·lar els paquets necessaris, abans de començar haurem de córrer
```shell
npm install -g gh-pages --save-dev
```

Per córrer l'aplicació web en `localhost` ho farem via
```shell
npm start
```

Per penjar els canvis a aquest repositori haurem de fer push a la branca `master` del canvi en el codi (dins `src/`) i per tal d'actualitzar la `GitHub Page` haurem de cridar
```shell
npm run deploy
```
