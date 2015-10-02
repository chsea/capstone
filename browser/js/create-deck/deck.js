app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('addDeck', {
        url: '/deck',
        templateUrl: 'js/create-deck/deck.html',
        controller: 'DeckController',
        resolve: {
            cardlist: function(CardFactory) {
                return CardFactory.findAll({})
                    .then(function(cards){
                        return cards;
                    });
                }
        }
    });
});

app.controller('DeckController', function ($scope, cardlist) {
    $scope.cardlist = cardlist;
    
    $scope.addCards = function() {

    };

});