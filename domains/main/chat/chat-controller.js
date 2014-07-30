'use strict';
angular.module('LinkApp')

.controller('ChatCtrl', function($scope, $rootScope, $state, $stateParams, SessionService) {
  
  var cardId = $stateParams.cardId;
  var cards = $rootScope.cards;
  $scope.card = _.find(cards, { 'id': cardId });


  $scope.sendMessage = function(text) {
    
    var message = {};
    message.id = Date.now().toString();
    message.text = text;
    message.from = SessionService.getMe();
    message.create_at = moment(Date.now()).fromNow();
    
    $scope.card.messages.push(message);
    $scope.text = '';

    console.log('$rootScope.cards', $rootScope.cards);

    
    // if(typeof SoftKeyboard !== 'undefined') {
    //   SoftKeyboard.show(function () {
    //     // success
    //     isMessageInputFucus = true;
    //   },function () {
    //     // fail
    //   });
    // }

  }
 });