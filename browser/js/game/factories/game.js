app.factory('Game', (Socket, $rootScope, $compile) => {
  let functions = scope => {
    let functions = {};
    functions.setMessage = text => {
      scope.message = text;
      $rootScope.$digest();
    };
    return functions;
  };
  return functions;
});
