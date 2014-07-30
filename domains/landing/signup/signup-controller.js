'use strict';
angular.module('LinkApp')

.controller('SignupCtrl', function($scope, $state, SignupService) {
  $scope.user = {};

  
  $scope.signup = function() {
    var user = $scope.user;
    SignupService.signup(user).then(function(response){
      // console.log('SignupCtrl:signup:success:response:', response);
      // console.log('CHECK sessionUser:', SessionService.getMe());
      
      $state.go('main');
    }, function(error){
      console.log('error:', error);
    });
  }
 });