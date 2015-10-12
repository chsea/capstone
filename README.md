# capstone

## Use node seed2.js to seed cards, node seed.js to seed random cards.

##Spell.logic
Please use the following logic format for spell cards:

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
    changeProperty: {
      property: 'logic',
      amount: {
        property: 'charge',
        amount: true
      }  
    },
    changeProperty: {
      property: 'ap',
      amount: 3
    }
  }  
}

Each key in 'spells' corresponds to a particular spell. Only the four above are built right now. Let's discuss if we want something more complicated.
changeProperty's amount key also take additional logic of which property to change. If you want to change a card's logic (i.e. give a minion charge), just write set amount to true like above, false if you want to take it away. Additionally, if you want to remove all the properties, just set property to 'all'.

target.targets takes an array of values from the four options above.

target.select takes a string from the three options above. "all" will apply the spell to all the targets you've selected. "random" all requires an additional target.targets.qty property to denote how many random targets from the targets array to apply the spell to. "selectable" lets you drag the light blue square in the corner to the target you want to select. However, if you try to increase a player's ap, it'll error. :(

I have test-seed.js and test-cards.js setup with a very simple pre-built deck. Open two sessions and go to /test test out the game! :) (Also, I've not testes extensively so I'm sure there's quite a few bugs so let me know if you guys find some!)

##Card logic
Cards have a similar format for logic except you'd say:

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

So far, I've only tested battlecry, but I've written the code for deathRattle, enrage, and eachTurn. There is an issue with targeting the minion casting the spell that I have to ask Joe about.
