// This state isnt currently being used,
// but may be used in the future to enable users to create their own cards

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('addCard', {
        url: '/card',
        templateUrl: 'js/add-card/card.html',
        controller: 'CardController',
    });
});

app.controller('CardController', function ($scope) {

    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);
    
    $scope.card = {};

    $scope.addCard = function(card) {
    	// create a new card
		};

  //    $scope.steps = [
  //   'Step 1: Card Info',
  //   'Step 2: Campaign Info',
  //   'Step 3: Campaign Media'
  // ];
  // $scope.selection = $scope.steps[0];

  // $scope.getCurrentStepIndex = function(){
  //   // Get the index of the current step given selection
  //   return _.indexOf($scope.steps, $scope.selection);
  // };

  // // Go to a defined step index
  // $scope.goToStep = function(index) {
  //   if ( !_.isUndefined($scope.steps[index]) )
  //   {
  //     $scope.selection = $scope.steps[index];
  //   }
  // };

  // $scope.hasNextStep = function(){
  //   var stepIndex = $scope.getCurrentStepIndex();
  //   var nextStep = stepIndex + 1;
  //   // Return true if there is a next step, false if not
  //   return !_.isUndefined($scope.steps[nextStep]);
  // };

  // $scope.hasPreviousStep = function(){
  //   var stepIndex = $scope.getCurrentStepIndex();
  //   var previousStep = stepIndex - 1;
  //   // Return true if there is a next step, false if not
  //   return !_.isUndefined($scope.steps[previousStep]);
  // };

  // $scope.incrementStep = function() {
  //   if ( $scope.hasNextStep() )
  //   {
  //     var stepIndex = $scope.getCurrentStepIndex();
  //     var nextStep = stepIndex + 1;
  //     $scope.selection = $scope.steps[nextStep];
  //   }
  // };

  // $scope.decrementStep = function() {
  //   if ( $scope.hasPreviousStep() )
  //   {
  //     var stepIndex = $scope.getCurrentStepIndex();
  //     var previousStep = stepIndex - 1;
  //     $scope.selection = $scope.steps[previousStep];
  //   }
  // };
});