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
var Minion = Game.promisifyAll(mongoose.model('Minion'));
var Spell = Game.promisifyAll(mongoose.model('Spell'));
var Game = Game.promisifyAll(mongoose.model('Game'));
var chance = require('chance')(123);

var tempData = {};

function randPhoto () {
    var g = chance.pick(['men', 'women']);
    var n = chance.natural({
        min: 0,
        max: 96
    });
    return 'http://api.randomuser.me/portraits/med/' + g + '/' + n + '.jpg';
}

var seedUsers = function () {
    var users = [
        {
            username: "Cookie_Monster",
            email: 'testing@fsa.com',
            password: 'password',
            photo: randPhoto()
        },
        {
            username: "L.i.z.z.y",
            email: 'obama@gmail.com',
            password: 'potus',
            photo: randPhoto()
        },
        {
            username: "moodie",
            email: "omri@fsa.com",
            password: "password",
            isAdmin: true,
            photo: randPhoto()
        },
        {
            username: "xoxo_Karrie",
            email: "karrie@gmail.com",
            password: "password",
            photo: randPhoto()
        }
    ];

    return User.createAsync(users);
};

function seedMinions() {
  var minions = [
    {
      name: 'Uber',
      category: 'transportation',
      cost: 10,
      hitPoints: 7,
      attackPoints: 10,
      description: 'Uber cool!',
      rarity: 3,
      portrait: '/images/uber.jpg',
    },
    {
      name: 'Slack',
      category: 'communication',
      cost: 6,
      hitPoints: 4,
      attackPoints: 7,
      description: 'Slack!',
      rarity: 1,
      portrait: '/images/slack.jpg',
    }
  ];

  return Minion.createAsync(minions);
}

function seedSpells() {
  var spells = [
    {
      name: 'Uber',
      category: 'transportation',
      cost: 10,
      hitPoints: 7,
      attackPoints: 10,
      description: 'Uber cool!',
      rarity: 3,
      portrait: '/images/uber.jpg',
    }
  ];

  return Spell.createAsync(spells);
}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function (users) {
      tempData.users = users;
      return seedMinions();
    }).then(function(minions) {
      tempData.minions = minions;

    }).then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
