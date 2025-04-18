const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategorieController {
  async index(request, response) {
    const categorie = await CategoriesRepository.listAll();
    response.json(categorie);
  }

  async show(request, response) { // obter UM registro
    const { id } = request.params;

    const categorie = await CategoriesRepository.findById(id);

    if (!categorie) {
      // 404: Not Found
      return response.status(404).json({ error: 'Categorie not found!' });
    }

    response.json(categorie);

  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const categorie = await CategoriesRepository.create({name});
    response.json(categorie);
  }

  async delete(request, response) {
    const { id } = request.params;
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categorieExist = await CategoriesRepository.findById(id);
    if (!categorieExist) { // 400: Bad request
      return response.status(400).json({ error: 'Categorie not found!' });
    };

    if (!name) { // 400: Bad request
      return response.status(400).json({ error: 'Name is required!' });
    };
    const categorie = await CategoriesRepository.update(id, {name});
    response.send(categorie);

  }

}

module.exports = new CategorieController();