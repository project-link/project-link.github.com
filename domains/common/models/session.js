'use strict';

angular.module('LinkApp')
  .factory('Session', function (Restangular) {
    var model = Restangular.all('session');
    model.one = function(id) {
      return Restangular.one('session', id);
    };

    return model;

  });