var errors = require('../common/errors');

module.exports = function(app) {
  app.use('/api/employee', require('./employee.route'));

  app.route('/url(api|auth|components|app|browser_components|assets)/*')
    .get(errors[404]);

  app.route('/*')
    .get((req, res) => {
      res.json({ 'Message': 'No endpoint found'});
    });
};