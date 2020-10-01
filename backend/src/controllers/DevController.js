const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        // Lista todos os Devs cadastrados no banco.
        const devs = await Dev.find();

        return response.json(devs);
    },

    async destroy(request, response) {
        // Busca um Dev pelo ID e deleta do banco caso ele exista.

        const _id = request.params._id;
    
        const dev = await Dev.findById(_id);
    
        if (dev != null) {
          await Dev.deleteOne({ _id });
          return response.json({ message: "Successful" });
        }
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // Busca um dev no banco pelo github_username
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            /*
                Caso o dev ainda não exista no banco,
                busca as suas informções no github com o username informado, e salva no banco juntamente com as tecnologias e as cordenadas do dev.
            */

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            
            /*
                Atualiza o client com o novo usuário cadastrado caso ele esteja no máximo a 10km de distância, e que tenha buscado pelo menos uma das tecnologias registradas pelo novo Dev.
            */
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    }
}