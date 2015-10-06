app.config(function($stateProvider) {
  $stateProvider.state('settings', {
    url: '/settings',
    templateUrl: 'js/settings/settings.html',
    controller: 'UserSettingsController',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    },
    data: {
        authenticate: true
    }
  });
});

app.controller('UserSettingsController', function($scope, user, UserFactory) {
  $scope.user = user;
  $scope.count = 1;
  $scope.showcards = true;
  $scope.showsettings = false;

  $scope.showCardsNow = function() {
    if ($scope.showcards){
      $scope.showcards = false;
    } else {
      $scope.showcards = true;
    }
  };

  $scope.showSettingsNow = function() {
    if ($scope.showsettings){
      $scope.showsettings = false;
    } else {
      $scope.showsettings = true;
    }
  };

  $scope.updateUser = function(userInfo) {
    // allow use to change their username
    console.log(userInfo);
  };

  $scope.removeDeck = function() {
    // allow user to delete one of their decks
  };

  $scope.addDeck = function() {
    // allow user to create a new deck
  };


});
