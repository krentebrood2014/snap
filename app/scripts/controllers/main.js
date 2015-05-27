'use strict';

/**
 * @ngdoc function
 * @name kitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kitApp
 */
angular.module('kitApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
