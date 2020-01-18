const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {

    async listDevs(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request,response){
        const { github_username, techs, latitud, longitud } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = githubResponse.data;
            const techArray = ParseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitud,latitud],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location,
            })
        }
    
        return response.json(dev);
    },

    async update(request, response){

    },

    async destroy(request, response){

    }
};