'use strict';

angular.module('LinkApp')
  .service('StorageService', function StorageService() {
    this.setValue = function(key, value, options) {
      angular.element.jStorage.set(key, value, options);
    };

    this.getValue = function(key) {
      return angular.element.jStorage.get(key);
    };

    this.removeValue = function(key) {
      angular.element.jStorage.deleteKey(key);
    };


    this.flush = function() {
      angular.element.jStorage.flush();
    };

    // ttl is 3600000 mili-seconds == 1hour
    this.setTTL = function(key, ttl) {
      // 60 mintues * 60 second * 1000 milliseconds
      var hour = ttl * 3600000;
      angular.element.jStorage.setTTL(key, hour);
    };
  });