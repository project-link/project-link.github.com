'use strict';

angular.module('LinkApp')
  .factory('Users', function (Restangular) {
    var model = Restangular.all('users');
    model.one = function(id) {
      return Restangular.one('users', id);
    };

    return model;
  });
