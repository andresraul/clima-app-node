const clima = require('./clima/clima');
const lugar = require('./lugar/lugar');
const argv = require('yargs')
    .option({
        direccion: {
            alias: 'd',
            describe: 'Dirección de la ciudad para obtener el clima',
            demand: true
        }
    })
    .help()
    .argv;


const getInfo = async(direccion) => {

    try {
        const dir = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(dir.lat, dir.lng);

        return `El clima de ${dir.direccion} es de ${temp}°C`
    } catch (error) {

        return `No se pudo determinar el clima de ${direccion}`

    }

}


getInfo(argv.d)
    .then(resp => {
        console.log(resp);
    })
    .catch(err => {
        console.log('ERROR!!!', err);
    })



/* lugar.getLugarLatLng(argv.d)
    .then(console.log)
    .catch(err => {
        console.log(err)
    }); */

/* clima.getClima('35', '139')
    .then(resp => console.log(resp))
    .catch(err => {
        console.log('ERROR!!!', err)
    }); */