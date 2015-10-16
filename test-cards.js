var minions = [
  {
    name: 'Driven Engineer',
    logic: {
      charge: true
    },
    description: 'Always looking to implement the next great feature. Initiative',
    rarity: 0,
    hp: 3,
    ap: 2,
    cost: 2,
    portait: 'awesome',
    category: 'super',
    stardustCost: 13
  }, {
    name: 'Agile-obsessed Engineer',
    logic: {
      windfury: true
    },
    description: 'An Engineer who\'s dedication to Agile is palpable. Agile ',
    rarity: 0,
    hp: 2,
    ap: 1,
    cost: 1,
    portait: 'awesome',
    category: 'super',
    stardustCost: 13
  }, {
    name: 'Loyal Employee',
    logic: {
      taunt: true
    },
    description: 'An employee that stands by you through thick and thin. Loyal ',
    rarity: 0,
    hp: 3,
    ap: 1,
    cost: 1,
    portait: 'awesome',
    category: 'super',
    stardustCost: 13
  }, {
    name: 'SteadFast employee',
    logic: {
      divineShield: true
    },
    description: 'Has been through quite a lot in his day. Steadfast',
    rarity: 0,
    hp: 3,
    ap: 1,
    cost: 1,
    portait: 'awesome',
    category: 'super',
    stardustCost: 13
  },


  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 6,
    logic: {
      // charge: true
      // divineShield: true
    },
    // portrait: 'https://radioeye.files.wordpress.com/2013/02/lindsay.jpg',
  },

  {
    name: "Junior Back-End Engineer",
    cost: 1, //2,
    ap: 1,
    portrait: 'junior-back-end-engineer.jpg',
    hp: 6,
    logic: {

      // charge: true
      // divineShield: true
    }
  }, {
    name: "Senior Back-End Engineer",
    cost: 1, //4,
    ap: 3,
    hp: 6,
    // portrait: 'http://www.fullstackacademy.com/img/team/griffin_t.jpg',
    logic: {
      // taunt: true
    }
  }, {
    name: "Junior Front-End Engineer",
    cost: 1, //2,
    ap: 2,
    hp: 1,
    portrait: 'junior-front-end-engineer.jpg',
    logic: {
      battlecry: {
        target: {
          targets: ['playerMinions'],
          select: 'all',
        },
        spells: {
          heal: {
            amount: 2
          }
        }
      },
      charge: true
    }
  }, {
    name: "Senior Front-End Engineer",
    cost: 1, //4,
    ap: 6,
    hp: 3,
    // portrait: 'http://www.fullstackacademy.com/img/team/zeke_nierenberg.jpg',
    logic: {
      charge: true,
      windfury: true
    }
  }, {
    name: "Scrum Master",
    cost: 1, //5,
    ap: 5,
    hp: 5,
    rarity: 1,
    // portrait: 'http://www.fullstackacademy.com/img/team/Mark.jpg',
    logic: {
      charge: true,
      // taunt: true,
      // enrage: {
      //   target: {
      //     targets: ['playerMinions'],
      //     select: 'all'
      //   },
      //   spells: {
      //     propertyChange: {
      //       property: 'ap',
      //       amount: 3
      //     }
      //   }
      // }
    }
  }];

var spells = [
  // {
  //   name: "Self-Heal",
  //   cost: 1,
  //   logic: {
  //     heal: {
  //       target: {
  //         targets: ["self"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Opponent Heal",
  //   cost: 1,
  //   logic: {
  //     heal: {
  //       target: {
  //         targets: ["opponent"],
  //         select: "all"
  //       },
  //       amount: 10
  //     }
  //   }
  // },
  // {
  //   name: "Opponent Minion Heal",
  //   cost: 1,
  //   logic: {
  //     heal: {
  //       target: {
  //         targets: ["opponentMinions"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Player Minion Heal",
  //   cost: 1,
  //   logic: {
  //     heal: {
  //       target: {
  //         targets: ["playerMinions"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Player + Minion Heal",
  //   cost: 1,
  //   logic: {
  //     heal: {
  //       target: {
  //         targets: ["self", "playerMinions"],
  //         select: "all"
  //       },
  //       amount: 10
  //     }
  //   }
  // },
  // {
  //   name: "Random Player + Minion Heal",
  //   cost: 1,
  //   logic: {
  //     heal: {
  //       target: {
  //         targets: ["self", "playerMinions"],
  //         select: "random",
  //         qty: 4
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Self-Damage",
  //   cost: 1,
  //   logic: {
  //     damage: {
  //       target: {
  //         targets: ["self"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Opponent Damage",
  //   cost: 1,
  //   logic: {
  //     damage: {
  //       target: {
  //         targets: ["opponent"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Opponent Minion Damage",
  //   cost: 1,
  //   logic: {
  //     damage: {
  //       target: {
  //         targets: ["opponentMinions"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Player Minion Damage",
  //   cost: 1,
  //   logic: {
  //     damage: {
  //       target: {
  //         targets: ["playerMinions"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Player + Minion Damage",
  //   cost: 1,
  //   logic: {
  //     damage: {
  //       target: {
  //         targets: ["self", "playerMinions"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Random Player + Minion Damage",
  //   cost: 1,
  //   logic: {
  //     damage: {
  //       target: {
  //         targets: ["self", "playerMinions"],
  //         select: "random",
  //         qty: 4
  //       },
  //       amount: 1
  //     }
  //   }
  // },
  // {
  //   name: "Self-Draw",
  //   cost: 1,
  //   logic: {
  //     draw: {
  //       target: {
  //         targets: ["self"],
  //         select: "all"
  //       },
  //       amount: 3
  //     }
  //   }
  // },
  // {
  //   name: "Opponent Draw",
  //   cost: 1,
  //   logic: {
  //     draw: {
  //       target: {
  //         targets: ["opponent"],
  //         select: "all"
  //       },
  //       amount: 1
  //     }
  //   }
  // }
  {
    name: "Remove all opponent minions properties",
    cost: 1,
    portraits: '',
    logic: {
      target: {
        targets: ["opponentMinions"],
        select: "all"
      },
      spells: {
        changeProperty: {
          amount: {
            all: true
          },
          property: 'logic'
        }
      }
    }
  }, {
    name: "Determined",
    cost: 1,
    // portrait: '',
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "all"
      },
      spells: {
        changeProperty: {
          amount: {
            property: "charge",
            amount: true
          },
          property: 'logic'
        }
      }
    }
  }, {
    name: "In The Zone",
    cost: 1,
    // portrait: '',
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "selectable",
        qty: 1
      },
      spells: {
        changeProperty: {
          amount: 3,
          property: 'ap'
        }
      }
    }
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
