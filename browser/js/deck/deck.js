app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('deck', {
        url: '/deck',
        controller: 'DeckController',
        templateUrl: 'js/deck/deck.html'
    });

});

app.controller('DeckController', function ($scope, FullstackPics) {

    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);
    $scope.deck = [];
});