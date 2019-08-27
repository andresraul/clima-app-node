require('../config/config')
const axios = require('axios');



const getLugarLatLng = async(lugar) => {

    const encodeURL = encodeURI(lugar);


    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        headers: {
            'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPIKEY
        }
    });

    const resp = await instance.get();

    if (resp.data.length === 0) {
        throw new Error(`No hay resultados para ${lugar}`);
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;






    return {
        direccion,
        lat,
        lng
    }


}

module.exports = {
    getLugarLatLng
}