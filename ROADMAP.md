# Current development priorities

The current priority is to add a system for auto-completing Charms and Merits on a character page, to help speed up character creation.  To do this "right," however, it needs some groundwork done first:

1. Update bonus/penalty system to incorporate the kinds of bonuses custom Charms can add (including Charms like Increasing Strength Exercise, Deadly Beastman Transformation, etc)
2. Add page for custom bonuses/penalties, flexible enough to handle these kinds of bonuses
3. Rewrite the calculation of default pools (Join Battle, Rush, etc) to support these penalties and bonuses, and to support Lunar Attribute-changing Charms
4. Add DB of canon Charms and merits with these bonuses 'baked in'
5. Rewrite Charm editor to enable linking new or existing Charms to this DB
6. Reformat pool display widgets with a better summary of active bonuses/penalties


# Other planned features

#### Character Sheet

- 'Dashboard' pages containing stats relevant to combat or social influence
- Auto-fill for merits/weapons/Charms/spells
- Character generation assistance (dot counts, BP costs, etc), with suggestions and page references
- 'Dice Bag' of favorite/commonly used rolls, including Charm/Excellency selections
- Poison/Disease tracking
- Sorcerous Working / Crafting / Project / extended roll trackers
- Dice rolling, with rolls permanently saved (for play-by-post games)
- Misc Bonus / Penalty support, including bonus Initiative in Initiative tracker
- Import/Export Character to/from YAML
- Support for active Charms modifying stats and pools
- Temporary health level support

#### QCs/BGs

- Auto-fill for sample QCs/Battlegroups
- Tagging and filtering for QCs/BGs (similar to Charm filtering)
- Import/Export QC/BG to/from YAML

#### Combat Tracker

- Crash mechanics
- Buttons for Attacks and other combat actions
- Support for order-changing effects like Flashing Draw Mastery, Consuming Might of the Fire Dragon, and Ramparts of Obedient Earth
- Independent actors like Virtuous Guardian of Flame, Single Point Form, and Persistent Hornet Attack
- Ability to have the same QC or BG in combat multiple times, with independent mote pools, health/magnitude tracks, and initiative
- Mounted Combat
- Poison support

#### Technical

- Additional login providers (Discord, Facebook, Twitter, perhaps more)
- Chronicle/Character/etc ownership transfers
- Documentation
- Better feedback on errors
- Optimization: faster load times, better performance while editing

# Potential features

Lower priority than the features above (Pull requests welcome!)

- Bookmarkable Charm filter settings
- Naval combat
- Printable sheets
- Printable charm cards
- Offline support
