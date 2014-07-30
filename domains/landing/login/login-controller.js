'use strict';
angular.module('LinkApp')

.controller('LoginCtrl', function($scope, $state, LoginService) {
  $scope.user = {};
  
  if(typeof SoftKeyboard !== 'undefined') {
    SoftKeyboard.show(function () {
      // success
    },function () {
      // fail
    });
  }



  $scope.login = function() {
    var user = $scope.user;
    LoginService.login(user).then(function(response){
      // console.log('success:response:', response);

      $state.go('main');
    }, function(error){
      console.log('error:', error);
    });
  }
 });