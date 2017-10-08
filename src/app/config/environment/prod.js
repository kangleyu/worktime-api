/**
 * Production specific configuration
 */
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
      process.env.IP ||
      undefined,
  
  // Server Port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8000,
  
  // MongoDB connection
  mongo: {
    uri:  process.env.MONGOLAB_URI || 
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_NODEJS_DB_URL ||
          process.env.OPENSHIFT_APP_NAME ||
          'mongodb://localhost/worktime-v2-prod'
  },

  // Seed database on startup
  seedDB: false,
  seedUser: true,

  // MonogDB user collection jwt token secret
  secret: 'jwt_worktime_api_token_secret'
};