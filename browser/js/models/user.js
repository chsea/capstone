app.factory('UserFactory', function(DS) {
  return DS.defineResource({
    idAttribute: '_id',
    name: 'users'
  });
}).run(function(UserFactory) {});
