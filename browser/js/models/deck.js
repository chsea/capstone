app.factory('DeckFactory', function(DS) {
  return DS.defineResource({
    name: 'decks',
   //  methods: {
			// removeCard: function(something) {
			// 	console.log(something);
			// }
   //  }
  });
}).run(function(DeckFactory) {});
