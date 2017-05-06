var errors = require('../common/errors');

module.exports = function(app) {
  app.use('/api/employee', require('./employee.route'));
  app.use('/api/project', require('./project.route'));
  app.use('/api/payment', require('./payment.route'));
  app.use('/api/worktime', require('./worktime.route'));
  app.use('/api/worktype', require('./worktype.route'));

  app.route('/url(api|auth|components|app|browser_components|assets)/*')
    .get(errors[404]);

  app.route('/*')
    .get((req, res) => {
      res.json({ 'Message': 'No endpoint found'});
    });
};