'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('LinkApp', [
  'restangular',
  'ngCordova',
  'ui.router',
  'ngAnimate-animate.css'
])


.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
  
  RestangularProvider.setBaseUrl('http://umanse.com:9000/');

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'domains/landing/landing.html',
      controller: 'LandingCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'domains/landing/signup/signup.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'domains/landing/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'domains/main/main.html',
      controller: 'MainCtrl'
    })
    .state('chat', {
      url: '/chat/:cardId',
      templateUrl: 'domains/main/chat/chat.html',
      controller: 'ChatCtrl'
    })
    .state('create-room', {
      url: '/create-room',
      templateUrl: 'domains/main/create-room/create-room.html',
      controller: 'CreateRoomCtrl'
    });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})


.run(function(Restangular, $rootScope, $state, $location, $anchorScroll, SessionService) {
  
  $rootScope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  }

  Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {

    var extractedData;
    if (operation === "getList") {
      var keys = Object.keys(data);
      var modelName = keys[0];

      extractedData = data[modelName];
    } else {
      extractedData = data;
    }
    
    // var token = response.headers('Auth-Token');
    // if(token) {
    //   SessionInfo.setToken(token);
    //   Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + token});
    // }
    
    return extractedData;
  });

  var loginNotRequired = ['landing', 'signup', 'signin'];
  var isLoginNotRequired = function (route) {
    return _.find(loginNotRequired,
      function (noAuthRoute) {
        return route === noAuthRoute;
      });
  };

  $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
    
    if(SessionService.isSignin()) {
      if(isLoginNotRequired(toState.name)) {
        $location.url('main');
      }
    } else {
      if(!isLoginNotRequired(toState.name)) {
        $location.url('login');
      }
    }
  });

});
