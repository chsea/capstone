var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 6,
    logic: {
      // charge: true
      // divineShield: true
    }
  },
  {
    name: "Junior Back-End Engineer",
    cost: 1, //2,
    ap: 1,
    hp: 6,
    logic: {
      // charge: true
      // divineShield: true
    }
  },
  {
    name: "Senior Back-End Engineer",
    cost: 1, //4,
    ap: 3,
    hp: 6,
    logic: {
      // taunt: true
    }
  },
  {
    name: "Junior Front-End Engineer - battlecry heal",
    cost: 1, //2,
    ap: 2,
    hp: 1,
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
  },
  {
    name: "Senior Front-End Engineer - charge windfury",
    cost: 1, //4,
    ap: 6,
    hp: 3,
    logic: {
      charge: true,
      windfury: true
    }
  },
  {
    name: "Scrum Master - enrage",
    cost: 1, //5,
    ap: 5,
    hp: 5,
    rarity: 1,
    logic: {
      charge: true,
      taunt: true,
      enrage: {
        target: {
          targets: ['thisMinion'],
          select: 'all'
        },
        spells: {
          propertyChange: {
            property: 'ap',
            amount: 3
          }
        }
      }
    }
  }
];

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
  },
  {
    name: "give all charge",
    cost: 1,
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
  },
  {
    name: "Add 3 ap to selectable",
    cost: 1,
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
