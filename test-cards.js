var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1
  },
  {
    name: "Junior Back-End Engineer",
    cost: 2,
    ap: 1,
    hp: 2,
    logic: {
      divineShield: true
    }
  },
  {
    name: "Senior Back-End Engineer",
    cost: 4,
    ap: 3,
    hp: 6,
    logic: {
      taunt: true
    }
  },
  {
    name: "Junior Front-End Engineer",
    cost: 2,
    ap: 2,
    hp: 1,
    logic: {
      charge: true
    }
  },
  {
    name: "Senior Front-End Engineer",
    cost: 4,
    ap: 6,
    hp: 3,
    logic: {
      windfury: true
    }
  },
  {
    name: "Scrum Master",
    cost: 5,
    ap: 5,
    hp: 5,
    rarity: 1,
    logic: {
      taunt: true,
      // enrage: {
      //   propertyChange: {
      //     target: 'self',
      //     property: 'ap',
      //     amount: 3
      //   }
      // }
    }
  }
];

var spells = [
  {
    name: "Tax Refund",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["self"],
          select: "all"
        },
        amount: 2
      }
    }
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
