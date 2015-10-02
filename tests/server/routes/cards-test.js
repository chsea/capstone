// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Card = mongoose.model('Card');
var User = mongoose.model("User");

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Card Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('/card', function () {

		var userAgent;
    var currentCard;
    var cardInfo;
    var userInfo;
    var loggedInAgent;

		beforeEach('Create User', function(done) {
      userInfo = {username: 'potus44', email: 'barack@aol.com', password:'Michelle', isAdmin: true};
      User.create(userInfo)
      .then(function(user) {
        currentUser = user;
        done();
      });
    });

		beforeEach('Create user agent', function (done) {
			userAgent = supertest.agent(app);
      done();
		});

    beforeEach('Create logged in agent', function(done) {
      loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
    });

    beforeEach('Create card', function(done) {
      cardInfo = {name: 'butterfly', category: 'communication', type: 'minion', description: "butterfly destroys it enemys with beautifuly written code", hitPoints: 5, attackPoints: 7};
      Card.create(cardInfo)
      .then(function(card) {
        currentCard = card;
        done();
      });
    });

    describe('gets all cards', function() {
  		it('should get a 200 response and return an array of cards', function (done) {
  			userAgent.get('/api/cards/')
  				.expect(200).end(function(err, response) {
            if(err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body[0]._id).to.equal(currentCard._id.toString());
            done();
          });
  		});
    });

    describe('posts card route', function() {
      it('should return a card', function(done) {
        userAgent.post('/api/card').send({name: 'BeckyLee', category: 'transportation', type: 'spell', description: "BeckyLee is the best!"})
        .end(function(err, response) {
            if(err) return done(err);
            expect(response.body.category).to.be.equal('transportation');
            done();
          });
      });
    });

    describe('users put route', function() {
      it('should update a card', function(done) {
        loggedInAgent.put('/api/card/' + currentCard._id).send({name: 'mocha'})
        .end(function(err, response) {
            if(err) return done(err);
            expect(response.body.name).to.be.equal('mocha');
            done();
          });
      });
    });
	});
});
