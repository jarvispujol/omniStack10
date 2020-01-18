const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index(request, response){
        const { latitud, longitud, techs } = request.query;
        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitud, latitud]
                    },
                    $maxDistance: 10000,
                }
            }
        })
        console.log(techsArray);


        return response.json({ devs })
    }
}
