app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('addDeck', {
        url: '/deck',
        controller: 'DeckController',
        templateUrl: 'js/createDeck/deck.html'
    });
});

app.controller('DeckController', function ($scope) {

    $scope.deck = [];
    $scope.createDeck = function(card) {
      // add cards to users deck
		};


});