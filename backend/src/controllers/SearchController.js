const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {
    /*
        Busca Devs por tecnologias (é precisso ter pelo menos uma das tecnologias pesquisadas), e que estejam em no máximo 10km de distância de quem está realizando a pesquisa.
    */

    async index(request, response) {
        const { latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    }, $maxDistance: 10000,
                },
            },
        });
        
        return response.json({ devs });
    }
}