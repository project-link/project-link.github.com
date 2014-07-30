'use strict';
angular.module('LinkApp')

.service('MainService', function($rootScope, SessionService, Session) {
  
  this.logout = function() {
    return Session.remove();
  }
 });

