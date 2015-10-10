# capstone

## Use node seed2.js to seed cards, node seed.js to seed random cards.

##Spell.logic
Please use the following logic format for spell cards:

logic: {
  heal: {
    target: {
      targets: ["self", "opponent", "playerMinions", "opponentMinions"],
      select: "all"/"random"/"selectable",
      //qty: only for random
    },
    amount: 2
  }
}

Right now, I only have heal implemented. I plan on also adding "damaage", "chanageProperty", and "draw" abilities tonight hopefully. Other more complicated abilities we'll have to discuss I think.

chanageProperty will also need a "property" property to denote which one you want to change.

target.targets takes an array of values from the four options above.

target.select takes a string from the three options above. "selectable" is not implemented yet. "all" will apply the spell to all the targets you've selected. "random" all requires an additional target.targets.qty property to denote how many random targets from the targets array to apply the spell to.

I have test-seed.js and test-cards.js setup with a pre-built deck. Use test-seed to test out healing! :) (Also, I've didn't test extensively so I'm sure there's quite a few bugs so let me know if you guys find some!)
