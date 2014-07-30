'use strict';
angular.module('LinkApp')

.directive('lnFocus', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.lnFocus, function(value) {
        if(value === true) { 
          console.log('value=',value);
          element[0].focus();
          scope[attrs.lnFocus] = false;
        }
      });
    }
  };
});
