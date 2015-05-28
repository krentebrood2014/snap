'use strict';

angular.module('kitApp')
  .controller('MainCtrl', function ($scope, _, $timeout) {
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

      var cards = [];
      $scope.snap = false;
      nrs.forEach(function (nr) {
        suits.forEach(function (st) {
          cards.push({number: nr, suit: st});
        });
      });

      //shuffle the cards
      var shuf = $scope.shuffle(cards);

      //divide into player and cpu cards
      $scope.playerCards = shuf.slice(0, shuf.length / 2);
      $scope.cpuCards = shuf.slice(shuf.length / 2, shuf.length);
    };

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
    };

    //player p (integer ) picks card from their pile and places it on centre pile
    //switch turns after
    $scope.placeCardCentrePile = function (p) {
      $scope.snapper = '';
      $scope.winner = '';
      if (!p && $scope.playerCards.length > 0) {
        $scope.centrePileCards.unshift($scope.playerCards[0]);
        $scope.playerCards.splice(0, 1);
      }
      else {
        //cpu
        if ($scope.cpuCards.length > 0) {
          $scope.centrePileCards.unshift($scope.cpuCards[0]);
          $scope.cpuCards.splice(0, 1);
        }
      }
      //switch turns to other player
      $scope.switchTurns(!p);

      $scope.checkWinner();
     };

    //switch turns to player p
    $scope.switchTurns = function (p) {
      $scope.playerTurn = p;
      //when the player is cpu trigger a placeCardCentrePile+ checksnap
      if (p) {
        $timeout(function () {
          $scope.placeCardCentrePile(1);
        }, 1000);
      }

      if ($scope.centrePileCards.length > 1 && $scope.centrePileCards[0].suit === $scope.centrePileCards[1].suit) {
        //delay snap reaction with ms
        $timeout(function () {
          $scope.checkSnapTakeCentrePile(1);
        }, $scope.reactionTimeCpu);
      }
    };

    // p hits centrepile
    // check whether snap is true?
    $scope.checkSnapTakeCentrePile = function (p) {
      if ($scope.centrePileCards.length > 1 && $scope.centrePileCards[0].suit === $scope.centrePileCards[1].suit) {
        $scope.snapper = (!p ? 'Player' : 'CPU') + ' calls snap';
        if (p) {
          $scope.cpuCards = _.union($scope.cpuCards, $scope.centrePileCards);
        }
        else {
          $scope.playerCards = _.union($scope.playerCards, $scope.centrePileCards);
        }
        $scope.centrePileCards = [];
      }
      $scope.checkWinner(p);
    };

    $scope.checkWinner = function (p) {
      if ($scope.cpuCards.length === 0 && $scope.playerCards.length > 0 && !p) {
        $scope.winner = 'player wins the game!!';
      }
      if ($scope.playerCards.length === 0 && $scope.cpuCards.length > 0 && p) {
        $scope.winner = 'CPU wins the game!!';
      }
      if ($scope.playerCards.length === 0 && $scope.cpuCards.length === 0) {
        $scope.winner = 'It is a draw';
      }
      if ($scope.winner!==''){
        $scope.snapper='';
      }
    };

    $scope.start = function () {
      //START GAME

      //choose random player
      $scope.playerTurn = Math.random() > 0.5 ? true : false;
      //$scope.startGame($scope.playerTurn, ['2', '3'], ['h', 'h']);
      $scope.startGame($scope.playerTurn, ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], ['s', 'h', 'd', 'c']);
    };
  });
