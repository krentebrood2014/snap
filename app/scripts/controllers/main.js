'use strict';


angular.module('kitApp')
  .controller('MainCtrl', function ($scope, _) {

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

    //player p (integer ) picks card from their pile and places it on centre pile
    $scope.placeCardCentrePile = function (p) {
      $scope.snapper = '';
      $scope.winner = '';
      $scope.snap = false;
      if ($scope.playerCards.length > 0) {
        $scope.centrePileCards.unshift($scope.playerCards[0]);
        $scope.playerCards.splice(0, 1)
      }
      else {
        //cpu
        if ($scope.cpuCards.length > 0) {
          $scope.centrePileCards.unshift($scope.cpuCards[0]);
          $scope.cpuCards.splice(0, 1)
        }
      }
    }

    $scope.checkSnapTakeCentrePile = function (p) {
      if ($scope.centrePileCards.length > 1 && $scope.centrePileCards[0].suit == $scope.centrePileCards[1].suit) {
        $scope.snapper = (p == 0 ? 'Player' : 'CPU') + ' calls snap';

        debugger;
        console.log('player calls snap:', p)
        if (p) {
          $scope.cpuCards = _.union($scope.cpuCards, $scope.centrePileCards);
        }
        else {
          $scope.playerCards = _.union($scope.playerCards, $scope.centrePileCards);
        }
        $scope.centrePileCards = [];
      }
    }

    $scope.start=function(){
      //START GAME
      $scope.startGame($scope.playerTurn, ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], ['s', 'h', 'd', 'c']);
    }

  });
