'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const { router, controller } = app;

  const jwtErr = app.middleware.jwtErr(app.config.jwt);
  
  router.post('/egg/findUser',controller.user.login);

  router.post('/egg/login',controller.user.login);

  router.get('/egg/test',jwtErr,controller.user.test);
};
