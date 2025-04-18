const { v4 } = require('uuid');

const db = require('../../database/index.js');

let contacts = [
  {
    // uuid -> Universal Unique ID
    id: v4(),
    name: 'Wigor',
    email: 'wigorsk@gmail.com',
    phone: '99999999999',
    category_id: v4(),
  },
  {
    id: '1234',
    name: 'Pedro',
    email: 'pedro@gmail.com',
    phone: '88888888888',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Alex',
    email: 'alex@gmail.com',
    phone: '77777777777',
    category_id: v4(),
  },
];

class ContactRepository {

  async listAll(OrderBy = 'ASC') {
    const direction = OrderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const row = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return row;
  }

  async findById(id) {
    const row = await db.query(`SELECT * FROM contacts WHERE id = $1`, [id])
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM contacts WHERE email = $1`, [email]);
    return row;
  }

  async delete(id) {
    const deleteOP = await db.query(`
      DELETE FROM contacts
      WHERE id = $1
    `,[id])

    return deleteOP;
  }

  async create({
    name, email, phone, category_id
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

}

module.exports = new ContactRepository();