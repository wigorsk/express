const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategorieController = require('./app/controllers/CategorieController');

const router = Router();

router.get(
  '/contacts',
  (request, response, next) => {
    request.appId = 'MeuAppId';
    next();
  },
  ContactController.index
);

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.delete('/contacts/:id', ContactController.delete);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategorieController.index);
router.get('/categories/:id', CategorieController.show);
router.post('/categories', CategorieController.store);
router.delete('/categories/:id', CategorieController.delete);
router.put('/categories/:id', CategorieController.update);

module.exports = router;