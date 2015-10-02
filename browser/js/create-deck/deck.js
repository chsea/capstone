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
                        console.log(cards);
                        return cards;
                    });
                }
        }
    });
});

app.controller('DeckController', function ($scope) {
    // console.log("card list: ", cardlist);
    // $scope.cardlist = cardlist;
    // $scope.user.deck;
  //   $scope.deck = [];
  //   $scope.addCardToDeck = function(card) {
  //     // add cards to users deck
		// };

});