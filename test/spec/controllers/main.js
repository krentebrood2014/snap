'use strict';

describe('Snap test Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('kitApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have a 26 cards each after dealing', function() {
    scope.startGame(0,['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], ['s', 'h', 'd', 'c']);
    expect(scope.playerCards.length).toBe(26);
    expect(scope.cpuCards.length).toBe(26);
    expect(scope.centrePileCards.length).toBe(0);
  });


  it('cpu takes card and places it on the centrepile',function(){
    scope.cpuCards=[{number: 6, suit: 'h'},{number: 6, suit: 's'}];
    scope.centrePileCards =[{number: 6, suit: 'h'},{number: 3, suit: 'h'}];
    scope.placeCardCentrePile(1);
    expect(scope.cpuCards.length).toBe(1);
    expect(scope.centrePileCards.length).toBe(3);
  });


});
