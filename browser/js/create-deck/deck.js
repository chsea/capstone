app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('addDeck', {
        url: '/deck',
        controller: 'DeckController',
        templateUrl: 'js/create-deck/deck.html',
        resolve: {
                cardlist: function(CardFactory) {
                    return Card.findAll({})
                        .then(function(cards){
                            return cards;
                        });
                    }
            }

    });
});

app.controller('DeckController', function ($scope) {
    // $scope.user.deck;
    $scope.deck = [];
    $scope.addCardToDeck = function(card) {
      // add cards to users deck
		};

});