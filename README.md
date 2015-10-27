##Windfury!
Live at windfury.co!

Windfury is a trading card game that involves turn-based battles between two adversaries. Each game represents a battle between players, who utilize spells and minions depicted on playing cards to defeat their opponent.

##Cards
There are two types of cards: spell cards and minion cards. Besides just attack power and health, each minion card can also have special properties that cast spells. Spell logic is abstracted and specified on each card which the server can then interpret.

###Spell.logic
Spell cards have the following format:

```js
logic: {
  target: {
    targets: ["self", "opponent", "playerMinions", "opponentMinions"],
    select: "all"/"random"/"selectable",
    //qty: only for random
  },
  spells {
    heal: {
      amount: 2
    },
    damage: {
      amount: 3
    },
    draw: {
      amount: 2
    },
    summon: {
      amount: {
        minion: {
          name: "hi",
          ap: 1,
          hp, 2
        }
      }
    },
    changeProperty: {
      property: 'logic',
      amount: {
        property: 'charge',
        amount: true
      }  
    }
  }  
}
```

Each key in 'spells' corresponds to a particular spell.

changeProperty's amount key also take additional logic of which property to change. If you want to change a card's logic (i.e. give a minion charge), just write set amount to true like above, false if you want to take it away. Additionally, if you want to remove all the properties, just set property to 'all'. On the other hand, if you want to change a non-logic property, use amount.amount to set the amount to add to the property (use negative numbers to subtract) or set amount.equal to true if you want the property to equal amount.amount.

target.targets takes an array of values from the four options above.

target.select takes a string from the three options above. "all" will apply the spell to all the targets you've selected. "random" all requires an additional target.targets.qty property to denote how many random targets from the targets array to apply the spell to. "selectable" lets you drag the blue selector to the target you want to select.

###Minion logic
Minion cards have a similar format for logic except a trigger mechanism is specified:

```js
logic: {
  battlecry: {
    target: {
      targets: ['self'],
      select: 'all'
    },
    spells: {
      heal: {
        amount: 2
      }
    }
  }
}
```

Minion cards can have the following special properties:
* charge*:
  * Can attack on 1st turn
* battlecry:
  * Casts on summon
* taunt*:
  * Opponent can only attack this minion
* divineShield*:
  * Minion won't take damage for one turn being attacked (expires after being attacked one time)
* deathRattle:
  * Casts on death
* windfury*:
  * Can attack twice per turn
* everyTurn:
  * Casts at the beginning of every turn
* enrage:
  * Casts when minion is at less than full health

(Properties marked with an * are boolean values only.)
