const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// rotas para cadastrar, listar e deletar desenvolvedores
routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.delete("/devs/:_id", DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;