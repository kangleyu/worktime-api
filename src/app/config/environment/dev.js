/**
 * Development specific configuration
 */
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
      process.env.IP ||
      undefined,
  
  // Server Port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8001,
  
  // MongoDB connection
  mongo: {
    uri: 'mongodb://localhost/worktime-v2-dev'
  },

  // Seed database on startup
  seedDB: false
};