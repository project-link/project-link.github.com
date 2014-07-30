'use strict';
angular.module('LinkApp')

.service('SignupService', function (Users, SessionService) {

  this.signup = function(user) {
    return Users.post(user).then(function(response){
      SessionService.setSession(response.user, response.token);
      return response;
    });
  }
});