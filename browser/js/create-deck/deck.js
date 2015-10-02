app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('addDeck', {
        url: '/deck',
        templateUrl: 'js/create-deck/deck.html',
        controller: 'DeckController',
        // resolve: {
        //         cardlist: function(CardFactory) {
        //             return cards.findAll({})
        //                 .then(function(cards){
        //                     return cards;
        //                 });
        //             }
        // }
    });
});

app.controller('DeckController', function ($scope) {
    // $scope.user.deck;
  //   $scope.deck = [];
  //   $scope.addCardToDeck = function(card) {
  //     // add cards to users deck
		// };

});