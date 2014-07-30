'use strict';

angular.module('LinkApp')
  .service('SessionService', function SessionInfo($rootScope, StorageService, Session, Restangular) {

    var sessionStorageKey = '_SG_SESSION_INFO_';
    $rootScope.sessionInfo = StorageService.getValue(sessionStorageKey) || {};
    Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + $rootScope.sessionInfo.token});

    this.setSessionUser = function(user) {
      if(user) {
        $rootScope.sessionInfo.user   = user;
        StorageService.setValue(sessionStorageKey, $rootScope.sessionInfo);
      }
    }

    this.getMe = function() {
      return $rootScope.sessionInfo.user;
    }

    this.updateSessionUser = function() {
      return Session.one().get().then(function(response){
        if(response.data) {
          $rootScope.sessionInfo.user = response.data;
          StorageService.setValue(sessionStorageKey, $rootScope.sessionInfo);
        }
        return response;
      });
    }

    this.setToken = function(token) {
      if(token) {
        $rootScope.sessionInfo.token  = token;
        Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + token});

        StorageService.setValue(sessionStorageKey, $rootScope.sessionInfo);
      }
    }

    this.setSession = function(user, token) {
      $rootScope.sessionInfo.user = user;
      $rootScope.sessionInfo.token = token;
      Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + token});

      StorageService.setValue(sessionStorageKey, $rootScope.sessionInfo);
    }

    this.removeSession = function() {
      $rootScope.sessionInfo = {};
      StorageService.removeValue(sessionStorageKey);

      Restangular.setDefaultHeaders({'Authorization': null});
    }

    this.isSignin = function() {
      if($rootScope.sessionInfo.user && $rootScope.sessionInfo.user.id, $rootScope.sessionInfo.token) {
        return true;
      } else {
        return false;
      }
    }

  });