const ContactRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) { // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.listAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) { // obter UM registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found!' });
    }

    response.json(contact);

  }

  async store(request, response) { // Criar um registro
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if ( contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    };

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) { // Editar um egistro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
     } = request.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) { // 400: Bad request
      return response.status(400).json({ error: 'User not found!' });
    };

    if (!name) { // 400: Bad request
      return response.status(400).json({ error: 'Name is required!' });
    };

    const emailExists = await ContactRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) { // 400: Bad request
      return response.status(400).json({ error: 'This e-mail is already in use' });
    };

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    response.send(contact);

  }

  async delete(request, response) { // Deletar um registro
    const { id } = request.params;

    await ContactRepository.delete(id)

    // 204: No Content
    response.sendStatus(204);
  }
}


// Singleton
module.exports = new ContactController();