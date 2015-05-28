'use strict';


angular.module('kitApp')
  .controller('MainCtrl', function ($scope) {

    //declare variables
    $scope.playerCards = [];
    $scope.cpuCards = [];
    $scope.centrePileCards = [];
    $scope.playerTurn = null;
    $scope.reactionTimeCpu = 2000;

    //deal cards to player and cpu
    $scope.startGame = function (p, nrs, suits) {
      $scope.playerCards = [];
      $scope.cpuCards = [];
      $scope.centrePileCards = [];
      $scope.playerTurn = null;
      $scope.reactionTimeCpu = 2000;
      $scope.snapper = '';
      $scope.winner = '';
      console.log('start game');
      //choose random player
      $scope.playerTurn = Math.random() > 0.5 ? 1 : 0;

      var cards = [];
      $scope.snap = false;
      nrs.forEach(function (nr) {
        suits.forEach(function (st) {
          cards.push({number: nr, suit: st})
        });
      });

      //shuffle the cards
      var shuf = $scope.shuffle(cards);

      //divide into player and cpu cards
      $scope.playerCards = shuf.slice(0, shuf.length / 2);
      $scope.cpuCards = shuf.slice(shuf.length / 2, shuf.length);
    }

    //shuffle the cards
    //shuffle the cards
    $scope.shuffle = function (array) {
      var m = array.length, t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    }

    //start game
    $scope.startGame($scope.playerTurn, ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], ['s', 'h', 'd', 'c']);
  });
