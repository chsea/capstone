var spells = [
  //name is name that appaers on view
  // logic is just a string that represents a function

  {
    name: 'Tech Boom',
    logic:['HealAllP6'],
    description: 'A tech boom is in town! Heal yourself and your minions by 6',
    rarity: 2,
    cost: 8,
    portait: 'awesome',
    category: 'super',
    stardustCost: 12
  }, {
    name: 'Nasdaq Crash',
    logic: ['DamageOCO6'],
    description: 'Tech companies are crashing! deal 6 damage to your opponent and his minions',
    rarity: 1,
    cost: 6,
    portait: 'awesome',
    category: 'super',
    stardustCost: 32

  }, {
    name: 'Agile Methodology',
    logic: ['AlterPCWindfuryAll'],
    description: 'It\'s all about the burn-down chart! Units can attack twice this turn',
    rarity: 2,
    cost: 7,
    portait: 'awesome',
    category: 'super',
    stardustCost: 53
  }, {
    name: 'Down Round',
    logic: ['DamageO5'],
    description: 'Things aren\'t going so well. Lower your opponents valuation by 15%',
    rarity: 1,
    cost: 4,
    portait: 'awesome',
    category: 'super',
    stardustCost: 17
  }, {
    name: 'Consultant',
    logic: [],
    description: 'Need some outside help. For the next three turns there are 2 more minions on the field',
    rarity: 1,
    cost: 3,
    portait: 'awesome',
    category: 'super',
    stardustCost: 37
  }, {
    name: 'IPO',
    logic: ['AlterPCAll3AP3HP'],
    description: 'Lets get rich (on paper)! Increases valuation and unit health and attack by 3 for next three turns',
    rarity: 2,
    cost: 8,
    portait: 'awesome',
    category: 'super',
    stardustCost: 37
  }, {
    name: 'On Ramp',
    logic: [],
    description: 'Acquaint an employee with your startup, increasing their attack.',
    rarity: 1,
    cost: 6,
    portait: 'awesome',
    category: 'super',
    stardustCost: 32

  }, {
    name: 'Unicorn',
    logic: [],
    description: 'Valuation becomes so high that you become invulnerable for two turns',
    rarity: 3,
    cost: 10,
    portait: 'awesome',
    category: 'super',
    stardustCost: 34
  }, {
    name: 'Poach Employee',
    logic: [],
    description: 'Take control of one of your opponent\'s units',
    rarity: 1,
    cost: 8,
    portait: 'awesome',
    category: 'super',
    stardustCost: 23

  }, {
    name: 'Copy Idea',
    logic: [],
    description: 'Copy your opponent\'s idea, allowing you to use their startup power for the next three turns',
    rarity: 1,
    cost: 3,
    portait: 'awesome',
    category: 'super',
    stardustCost: 12
  }, {
    name: 'Rid Technical Debt',
    logic: [],
    description: 'For every other turn that has passed, draw cards ',
    rarity: 2,
    cost: 6,
    portait: 'awesome',
    category: 'super',
    stardustCost: 27
  }, {
    name: 'Gone Viral',
    logic: [],
    description: 'Heal 10, but your units are exhausted and can\'t attack this turn ',
    rarity: 1,
    cost: 6,
    portait: 'awesome',
    category: 'super',
    stardustCost: 25
  }, {
    name: 'Angel Round',
    logic: [],
    description: 'Get a chance! If a unit takes damage that would kill it, bring it back to life',
    rarity: 2,
    cost: 6,
    portait: 'awesome',
    category: 'super',
  }, {
    name: 'Rapid Iteration',
    logic: [],
    description: 'Fail fast, fail often. Give unit Agile',
    rarity: 1,
    cost: 5,
    portait: 'awesome',
    category: 'super',
    stardustCost: 32
  }
];


var minions = [{
  name: 'David Yang',
  logic: {
    battlecry:[]
  },
  description: 'A Legendary Co-Founder. Inspiration: Summon a Fullstack Graduate; summon 3 if Nimit is present',
  rarity: 3,
  hitPoints: 8,
  attackPoints: 10,
  cost: 7,
  portait: 'awesome',
  category: 'founder',
  stardustCost: 37
}, {
  name: 'Nimit Maaru',
  logic: {
    battlecry:[]
  },
  description: 'A Legendary Co-Founder. Inspiration: Summon a Fullstack Graduate; 3 if Daid is present',
  rarity: 3,
  hitPoints: 10,
  attackPoints: 8,
  cost: 7,
  portait: 'awesome',
  category: 'founder',
  stardustCost: 31
}, {
  name: 'Mark Zuckerburg',
  logic: {
    battlecry:[]
  },
  description: 'The Legendary CEO-Founder. Inspiration: double all technical units\' attack',
  rarity: 3,
  hitPoints: 7,
  attackPoints: 7,
  cost: 6,
  portait: 'awesome',
  category: 'founder',
  stardustCost: 35
}, {
  name: 'Fullstack Graduate',
  logic: {
    eachTurn:[]
  },
  description: 'A well-trained Engineer. Gains +1 attack and strength for each other Fullstack graduate, gains +2 with Nimit or David',
  rarity: 2,
  hitPoints: 4,
  attackPoints: 4,
  cost: 5,
  portait: 'awesome',
  category: 'super',
  stardustCost: 34
}, {
  name: 'Junior Front-End Engineer',
  logic: {
    eachTurn:[]
  },
  description: 'Learning the ropes, will become a senior in three turns',
  rarity: 0,
  hitPoints: 2,
  attackPoints: 4,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 52
}, {
  name: 'Junior Back-End Engineer',
  logic: {

  },
  description: 'Learning the ropes, will become a senior in three turns',
  rarity: 0,
  hitPoints: 4,
  attackPoints: 2,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 37
}, {
  name: 'Senior Front end Engineer',
  logic: {
    windfury:true
  },
  description: 'Experienced front end engineer with agile',
  rarity: 1,
  hitPoints: 2,
  attackPoints: 4,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 12
}, {
  name: 'Senior Back end Engineer',
  logic: {
    taunt:true
  },
  description: 'Experienced back end engineer with taunt',
  rarity: 1,
  hitPoints: 2,
  attackPoints: 4,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 10
}, {
  name: 'Product Manager',
  logic: {},
  description: 'Always trying to make the product better: can cast startup power twice a turn',
  rarity: 1,
  hitPoints: 2,
  attackPoints: 4,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 16
}, {
  name: 'Andreessen Horowitz',
  logic: {
    eachTurn:['HealP6']
  },
  description: 'Legendary VC. Restore 5 to your startup each turn',
  rarity: 3,
  hitPoints: 8,
  attackPoints: 7,
  cost: 7,
  portait: 'awesome',
  category: 'super',
  stardustCost: 17
}, {
  name: 'Fast mover',
  logic: {
    charge:true
  },
  description: 'A unit that gets things done. Can attack on the turn it is summoned ',
  rarity: 1,
  hitPoints: 3,
  attackPoints: 4,
  cost: 3,
  portait: 'awesome',
  category: 'super',
  stardustCost: 17
}, {
  name: 'AWS Ninja',
  logic: {
    eachTurn:[]
  },
  description: 'Uses AWS infrastructure to make everything more effecient. Decrease cost of everything by 1',
  rarity: 2,
  hitPoints: 2,
  attackPoints: 4,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 14
}, {
  name: 'Fortran Engineer',
  logic: {
    charge:true
  },
  description: 'These guys are still around?',
  rarity: 0,
  hitPoints: 3,
  attackPoints: 2,
  cost: 2,
  portait: 'awesome',
  category: 'super',
  stardustCost: 13
}, {
  name: 'Customer Support',
  logic: {
    windfury:true
  },
  description: 'An employee that\'s always looking out for your customers. Windfury ',
  rarity: 0,
  hitPoints: 2,
  attackPoints: 1,
  cost: 1,
  portait: 'awesome',
  category: 'super',
  stardustCost: 13
}, {
  name: 'Slacker',
  logic: {
    taunt:true
  },
  description: 'Can\'t live with them, can\'t live without them. Taunt ',
  rarity: 0,
  hitPoints: 3,
  attackPoints: 1,
  cost: 1,
  portait: 'awesome',
  category: 'super',
  stardustCost: 13
},{
  name: 'SteadFast employee',
  logic: {
    divineShield:true
  },
  description: 'An employee who has been around for a while. Divineshield',
  rarity: 0,
  hitPoints: 3,
  attackPoints: 1,
  cost: 1,
  portait: 'awesome',
  category: 'super',
  stardustCost: 13
}, {
  name: 'Designer',
  logic: {},
  description: 'A designer who has trouble making his sites dynamic. Gains 2/2 with a front end engineer',
  rarity: 1,
  hitPoints: 4,
  attackPoints: 4,
  cost: 4,
  portait: 'awesome',
  category: 'super',
  stardustCost: 17
}, {
  name: 'Generic CEO',
  logic: {

  },
  description: 'A generic CEO who isn\'t always the right fit. Powerful alone, weak in teams',
  rarity: 1,
  hitPoints: 6,
  attackPoints: 6,
  cost: 4,
  portait: 'awesome',
  category: 'super',
  stardustCost: 16
}, {
  name: 'Non-Technical Co-Founder',
  logic: {},
  description: 'A non-technical co-founder. Gain 1/1 for each technical unit',
  rarity: 1,
  hitPoints: 4,
  attackPoints: 4,
  cost: 5,
  portait: 'awesome',
  category: 'super',
  stardustCost: 15
}];





var damageEffects = [{
    name: 'DamageO1',
    target: ['opponent'],
    quantity: 1,
    baseAmount: 1
  }, {
    name: 'DamageO2',
    target: ['opponent'],
    quantity: 1,
    baseAmount: 2
  }, {
    name: 'DamageO3',
    target: ['opponent'],
    quantity: 1,
    baseAmount: 3
  }, {
    name: 'DamageO4',
    target: ['opponent'],
    quantity: 1,
    baseAmount: 4
  },{
    name: 'DamageO5',
    target: ['opponent'],
    quantity: 1,
    baseAmount: 5
  },  {
    name: 'DamageOC1',
    target: ['opponentCard'],
    quantity: 1,
    baseAmount: 1
  }, {
    name: 'DamageOC2',
    target: ['opponentCard'],
    quantity: 1,
    baseAmount: 2
  }, {
    name: 'DamageOC3',
    target: ['opponentCard'],
    quantity: 1,
    baseAmount: 3
  }, {
    name: 'DamageOCKill',
    target: ['opponentCard'],
    quantity: 1,
    baseAmount: 99
  }, {
    name: 'DamageOCO1',
    target: ['opponentCard', 'opponent'],
    quantity: 10,
    baseAmount: 1
  }, {
    name: 'DamageOCO2',
    target: ['opponentCard', 'opponent'],
    quantity: 10,
    baseAmount: 2
  }, {
    name: 'DamageOCO3',
    target: ['opponentCard', 'opponent'],
    quantity: 10,
    baseAmount: 3
  }, {
    name: 'DamageOCO4',
    target: ['opponentCard', 'opponent'],
    quantity: 10,
    baseAmount: 4
  },{
    name: 'DamageOCO6',
    target: ['opponentCard', 'opponent'],
    quantity: 10,
    baseAmount: 6
  },  {
    name: 'DamageAOEOC1',
    target: ['opponentCard'],
    quantity: 10,
    baseAmount: 1
  },{
    name: 'DamageAOEOC2',
    target: ['opponentCard'],
    quantity: 10,
    baseAmount: 2
  }, {
    name: 'DamageAOEOC3',
    target: ['opponentCard'],
    quantity: 10,
    baseAmount: 3
  }, {
    name: 'DamageAOEOC4',
    target: ['opponentCard'],
    quantity: 10,
    baseAmount: 4
  }



];
var healEffects = [{
    name: 'HealP2',
    target: ['player'],
    quantity: 1,
    baseAmount: 4
  }, {
    name: 'HealP4',
    target: ['player'],
    quantity: 1,
    baseAmount: 4
  }, {
    name: 'HealP5',
    target: ['player'],
    quantity: 1,
    baseAmount: 5
  },{
    name: 'HealP6',
    target: ['player'],
    quantity: 1,
    baseAmount: 6
  }, {
    name: 'HealP8',
    target: ['player'],
    quantity: 1,
    baseAmount: 8
  }, {
    name: 'HealPC1',
    target: ['playerCard'],
    quantity: 1,
    baseAmount: 1
  }, {
    name: 'HealPC2',
    target: ['playerCard'],
    quantity: 1,
    baseAmount: 2
  }, {
    name: 'HealPC3',
    target: ['playerCard'],
    quantity: 1,
    baseAmount: 3
  }, {
    name: 'HealPCmaxHeal',
    target: ['playerCard'],
    quantity: 1,
    baseAmount: 99
  }, {
    name: 'HealAllP1',
    target: ['playerCard', 'player'],
    quantity: 10,
    baseAmount: 1
  }, {
    name: 'HealAllP2',
    target: ['playerCard', 'player'],
    quantity: 10,
    baseAmount: 2
  }, {
    name: 'HealAllP3',
    target: ['playerCard', 'player'],
    quantity: 10,
    baseAmount: 3
  }, {
    name: 'HealAllP4',
    target: ['playerCard', 'player'],
    quantity: 10,
    baseAmount: 5
  }, {
    name: 'HealAllP6',
    target: ['playerCard', 'player'],
    quantity: 10,
    baseAmount: 6
  }

];

var alterPropertyEffects = [{
    name: 'AlterPC1AP',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 1,
    cost: 0,
  }, {
    name: 'AlterPC2AP',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 2,
    cost: 0,
  }, {
    name: 'AlterPC1AP1HP',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 1,
    attackPoints: 1,
    cost: 0,
  }, {
    name: 'AlterPC2AP2HP',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 2,
    attackPoints: 2,
    cost: 0,

  }, {
    name: 'AlterPC3AP3HP',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 2,
    attackPoints: 2,
    cost: 0,

  }, {
    name: 'AlterPCAll3AP3HP',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 2,
    attackPoints: 2,
    cost: 0,

  }, {
    name: 'AlterPCCost1',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 0,
    cost: 3,

  }, {
    name: 'AlterPCCost2',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 0,
    cost: 2,

  }, {
    name: 'AlterPCCost3',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 0,
    cost: 3,

  },{
    name: 'AlterPCCWindfury1',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 0,
    cost: 0,
    logic: {
      windfury:true
    }

  },{
    name: 'AlterPCWindfuryAll',
    target: ['playerCard'],
    quantity: 10,
    hitPoints: 0,
    attackPoints: 0,
    cost: 0,
    logic:{
      windfury:true
    }
  },{
    name: 'AlterPInvulernable',
    target: ['playerCard'],
    quantity: 1,
    hitPoints: 0,
    attackPoints: 0,
    cost: 0,
    logic: {
      windfury:true
    }

  }

];






module.exports = {
  spells: spells,
  minions: minions,
  alter: alterPropertyEffects,
  damage: damageEffects,
  heal: healEffects

};
