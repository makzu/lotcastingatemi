# Weapons

LCA supports a wide range of weapon options. Any Attribute/Ability combination, as well as Essence, can be used for the attack roll, and any Attribute (plus Essence) can be used for the damage roll on **Withering** attacks. The selector will only show Abilities your character has dots in.

For ranged weapons, LCA looks for a range tag. These tags should be formatted like `Archery (long)` or `Thrown (close)` to get the correct pools. The parenthesis are required, but the space is optional and capitalization does not matter.

If a weapon has an "optional" range tag - for example, mortal daggers (_Core, p. 581_) or Frost-Thorn Knuckles (_Arms of the Chosen, p. 31_) it is recommeded that you create two weapon entries - one for Thrown, the other for close range.

Bonuses in the Advanced section of the weapon editor are added _after_ any tag effects are calculated.

---

### Handled Tags

`Bashing`, `Lethal`, and `Aggravated` will set the **Decisive** damage type appropriately.

`Crossbow`, `Flame`, and `Firearm`\* sets the **Withering** damage bonus to 4 rather than your character's Strength. `Flame` also affects the close-range accuracy of Archery weapons.

`Subtle` sets the weapon's damage to 0. `Shield` reduces it by 2 and adds a blurb about using it in a Full Defense action. `Balanced` adds 1 to the weapon's minimum damage.

`Paired`\*, `Two-Handed`, `Chopping`, `Piercing`, `Smashing`, `Flexible`, `Slow`, `Improvised`, `Poisonable`, and `Powerful` all add notes to the weapon's attack pool popup detailing the tag's effect or bonus.

Any other tags will be ignored, but still displayed on the weapon entry.

Tags with a \* symbol do not exist in the rulebook, but still affect LCA's calculations.

---

### Special Weapons:

#### Elemental Bolt Attack:

This weapon has special handling.

Just add `elemental bolt`\* to the weapon's tags and it will automatically set the correct range, damage, and overwhelming values, and will automatically select the higher of Archery or Thrown. (These can all be changed _after_ adding the tag) Add the element of the bolt to the tags to pick up the correct damage type and other benefits. For example, adding `water` to the tags sets the damage type to Bashing and adds Flexible and Disarming blurbs to the weapon pool popup.

#### The Burning Name:

The option to change the attack attribute to Intelligence is under the 'Advanced' expando. Occult will appear under Attack Abilities if your character has any dots in Occult.
