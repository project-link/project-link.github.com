'use strict';
angular.module('LinkApp')

.service('CreateRoomService', function(Users) {

  this.getUsers = function() {
    return Users.getList();
  }
 });