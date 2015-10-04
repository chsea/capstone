app.config($stateProvider => {
  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'js/game/test.html',
    controller: 'Test',
  });
}).controller('Test', ($scope, $compile) => {
    $scope.card = {hp: 5};
    $scope.test = () => {
    $compile('<card card="card"></card>')($scope).appendTo('#hi');
    $('card').show('slow');
  };
});
