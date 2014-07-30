'use strict';
angular.module('LinkApp')

.controller('MainCtrl', function($scope, $state, $rootScope, MainService, SessionService) {
  console.log('ME:', SessionService.getMe());
  console.log('MainCtrl:cards:', $rootScope.cards);

  
  $scope.logout = function() {
    SessionService.removeSession();
    MainService.logout();
    $state.go('login');
  }
 });