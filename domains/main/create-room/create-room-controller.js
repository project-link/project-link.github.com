'use strict';
angular.module('LinkApp')

.controller('CreateRoomCtrl', function($scope, $state, $rootScope, CreateRoomService) {
  $scope.card = {};
  $scope.link = {};
  $scope.users = {};
  $scope.checkedUsers = [];

  init();


  function init() {
    getUsers();
  }

  function getUsers() {
    CreateRoomService.getUsers().then(function(users){
      console.log('CreateRoomCtrl:getUsers:resonse', users);
      
      $scope.users = users;
    }, function(error){
      console.log('error:', error);
    });
  }

  $scope.checkUser = function(user) {
    user.checked = !user.checked;
    
    if(user.checked) {
      $scope.checkedUsers.push(user);
    } else {
      var index = $scope.checkedUsers.indexOf(user);
      $scope.checkedUsers.splice(index, 1);
    }
  }
  
  $scope.createCard = function(checkedUsers) {
    
    // TEMP
    var linkId = Date.now().toString();
    var linkType = 'SOLO';
    
    if(checkedUsers.length == 1 ){
      linkType = 'SOLO';
    }else if(checkedUsers.length > 1 ){
      linkType = 'GROUP';
    }

    $scope.link = {
      id: linkId,
      name: $scope.link.name,
      linkType: linkType,
      links: checkedUsers,
      create_at: Date.now()
    }
    
    var cardId = Date.now().toString();
    var card = {
      id: cardId,
      cardType: 'CHAT',
      link: $scope.link,
      messages: [],
      create_at: Date.now()
    };

    $rootScope.cards.push(card);
    console.log('createCard:cards', $rootScope.cards);

    $state.go('chat', {cardId: cardId});
  }

 });