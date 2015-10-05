/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Minion = Promise.promisifyAll(mongoose.model('Minion'));
var Spell = Promise.promisifyAll(mongoose.model('Spell'));
var Card = Promise.promisifyAll(mongoose.model('Card'));
var Deck = Promise.promisifyAll(mongoose.model('Deck'));
var _ = require('lodash');

var Game = Promise.promisifyAll(mongoose.model('Game'));
var chance = require('chance')(123);

var tempData = {};
var companies = ["Abacus", "AirHelp", "AirPair", "Algolia", "Ambition", "AptDeco", "Beacon", "Bellabeat", "Boostable", "Cambly", "Camperoo", "CareMessage", "CodeCombat", "CodeNow", "Eventjoy", "Framed Data", "Gbatteries"];
var spellNames = ["Astral Communion", "Bite", "Claw", "Dark Wispers", "Force of Nature", "Healing Touch", "Innervate", "Living Roots", "Mark of the Wild", "Poison Seeds", "Recycle"];
var category = ["transportation", "education", "communication", "sharing economy"];

function randPhoto() {
  var g = chance.pick(['men', 'women']);
  var n = chance.natural({
    min: 0,
    max: 96
  });
  return 'http://api.randomuser.me/portraits/med/' + g + '/' + n + '.jpg';
}

var seedUsers = function() {
  var users = [{
    username: "Cookie_Monster",
    email: 'testing@fsa.com',
    password: 'password',
    cards: [],
    photo: randPhoto(),
    decks:[]
  }, {
    username: "L.i.z.z.y",
    email: 'obama@gmail.com',
    password: 'potus',
    photo: randPhoto(),
    cards: [],
    decks: []
  }, {
    username: "moodie",
    email: "omri@fsa.com",
    password: "password",
    isAdmin: true,
    photo: randPhoto(),
    cards: [],
    decks: []
  }, {
    username: "xoxo_Karrie",
    email: "karrie@gmail.com",
    password: "password",
    photo: randPhoto(),
    cards: [],
    decks: []
  },
  {
    username: "sea",
    email: "sea@hi.com",
    password: "bye",
    photo: randPhoto(),
    cards: [],
    decks: []
  },
  {
    username: "sky",
    email: "sky@hi.com",
    password: "bye",
    photo: randPhoto(),
    cards: [],
    decks: []
  }];
  users.forEach(function(user) {
    var deck1 = tempData.decks[Math.floor(Math.random() * tempData.decks.length)]._id;
    var deck2 = tempData.decks[Math.floor(Math.random() * tempData.decks.length)]._id;
    user.decks.push(deck1, deck2);
  });
  return User.createAsync(users);
};


function seedDeck() {
  var decks = [];
  var names = ['alex\'s', 'chelsea\'s', 'kate\'s'];
  var adjectives = ['amazing', 'super', 'cool', 'best', 'next-level'];
  var nouns = ['deck', 'assortment of cards', 'selection'];

  for (var i = 0; i < 20; i++) {
    var deck = {};
    deck.name = names[Math.floor(Math.random() * names.length)] + ' ' + adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)];
    deck.cards = [];
    for (var j = 0; j < 30; j++) {
      var card = tempData.cards[Math.floor(Math.random() * tempData.cards.length)];
      deck.cards.push(card);
    }
    decks.push(deck);
  }
  return Deck.createAsync(decks);
}

function seedCards() {
  var cards = [];
  for (var i = 0; i < 30; i++){
    cards.push(tempData.cards);
  }
  return Cards.createAsync(cards);
}

function seedMinions() {
  var minions = [];

  for (var i = 0; i < 100; i++) {
    var obj = {};
    obj.name = companies[Math.floor(Math.random() * companies.length)] + i;
    obj.category = category[Math.floor(Math.random() * category.length)];
    obj.description = "Y Combinator Company";
    obj.portrait = "http://thecatapi.com/api/images/get?format=src&type=gif";
    obj.rarity = Math.floor(Math.random() * 4);
    obj.cost = Math.floor(Math.random() * 10);
    obj.hitPoints = Math.floor(Math.random() * 10);
    obj.attackPoints = Math.floor(Math.random() * 10);
    minions.push(obj);
  }

  return Minion.createAsync(minions);
}

function seedSpells() {
  var spells = [];
  for (var i = 0; i < 100; i++) {
    var obj = {};
    obj.name = spellNames[Math.floor(Math.random() * spellNames.length)] + i;
    obj.category = category[Math.floor(Math.random() * category.length)];
    obj.cost = Math.floor(Math.random() * 10);
    obj.description = "Y Combinator Spell";
    obj.rarity = Math.floor(Math.random() * 4);
    obj.portrait = "http://thecatapi.com/api/images/get?format=src&type=gif";
    spells.push(obj);
  }
  return Spell.createAsync(spells);
}

function seedGames() {
  var games = [{
    name: 'Startup',
    cards: tempData.cards.map(function(card) {
      return card._id;
    }),
    decks: tempData.decks.map(function(deck) {
      return deck._id;
    }),
    creators: [tempData.users[0]._id]
  }];

  return Game.createAsync(games);
}

connectToDb.then(function() {
  var remove = [
    User.remove(),
    Deck.remove(),
    Card.remove(),
    Game.remove()
  ];

  Promise.all(remove)
    .then(function() {
      return seedMinions();
    }).then(function(minions) {
      tempData.cards = minions;
      return seedSpells();
    }).then(function(spells) {
      tempData.cards.concat(spells);
      return seedDeck();
    }).then(function(decks) {
      tempData.decks = decks;
      return seedUsers();
    }).then(function(users) {
      tempData.users = users;
      return seedGames();
    }).then(function(games) {
      tempData.games = games;
      return User.updateAsync({}, {games: tempData.games}, {multi: true});
    }).then(function(users) {
      return Deck.updateAsync({}, {game: tempData.games[0]}, {multi: true});
    }).then(function(decks) {
      console.log(chalk.green('Seed successful!'));
      process.kill(0);
    }).catch(function(err) {
      console.error(err);
      process.kill(1);
    });
});
