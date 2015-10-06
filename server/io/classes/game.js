class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.state = 'initialCards';
    this.turn = 0;
    this.currentPlayer = null;
    this.waitingPlayer = null;
  }

  endTurn () {
    this.turn++;
    let p = this.currentPlayer;
    this.currentPlayer = this.waitingPlayer;
    this.waitingPlayer = p;
  }
}

module.exports = Game;
