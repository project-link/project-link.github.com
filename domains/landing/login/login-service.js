'use strict';
angular.module('LinkApp')

.service('LoginService', function (Session, SessionService) {

  this.login = function(user) {
    return Session.post(user).then(function(response){
      SessionService.setSession(response.user, response.token);
      return response;
    });
  }

});