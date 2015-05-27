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
    var controller = createController();
    scope.startGame(0,['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], ['s', 'h', 'd', 'c']);
    expect(scope.playerCards.length).toBe(26);
    expect(scope.cpuCards.length).toBe(26);
    expect(scope.centrePileCards.length).toBe(0);
  });

});
