## v63

###### _Not yet released_

- Nothing (yet)
- Character sheets can now be duplicated just like QC/BG sheets
- Bug fixes

## v62

###### _Oct 8, 2018_

- The weapon editor has been rebuilt from the ground up as a pop-up.
- Weapons can now have arbitrary bonuses added to accuracy, damage, defense, and/or overwhelming
- Weapons can also have short notes or descriptions added
- Added Essence to the list of available attributes for attack rolls
- Custom exalts now start with mote pools of 10 instead of 0
- Added an option to delete your account and all associated data
- Performance improvements - removed unnecessary re-renders
- Bug fixes (Thanks Vejuz)

## v61

###### _Sep 4, 2018_

- Added Anima level to Excellency builder, to support Odara, Chosen of Ash
- Added option to duplicate QCs and Battlegroups
- Added option to create a battlegroup of a specific QC
- Creating a Character/QC/BG or joining a Chronicle will now bring you immediately to the relevant page
- The 'Create a Character' pop-up now has some additional text describing each of the custom Exalt types

## v60

###### _Aug 20, 2018_

- A new 'Bio' tab has been added to Character sheets with spots for Lore background, iconic Anima display, a portrait link, and generic notes
- The cap on Attributes has been raised to 10
- Added a button to edit mote committments from the Spend Motes pop-up
- QCs can now be marked as public just like Characters
- Improved automated test suite
- Better support for older browsers via [Polyfill.io](https://polyfill.io/)
- Bug fixes

## v58-v59

###### _June 29, 2018_

- Crash fixes (Thanks Blaque, KaneMotri)

## v56

###### _June 28, 2018_

- Battlegroup cards now include the same pools and ratings as QC cards
- Bug fixes (Thanks Maudova, Yukizawa)
- Added Patreon link

## v55

###### _June 23, 2018_

- Bug fixes (Thanks Havoc)

## v50

###### _June 20, 2018_

- **Initiative Tracker**: A pared-down version of the Characters page, showing Characters/QCs/Battlegroups in Initiative order. Includes quick access to controls for editing initiative and onslaught penalties.
- **ST controls**: A simple control panel on the Chronicle dashboard enables STs to end all scenelong effects, recover motes or willpower, and more
- Certain fields like Character descriptions, Charm/Spell/Merit bodies, and charm summaries now support Markdown formatting, which enables things like images, tables, and lists.
- Added Elemental Aura display to character cards
- Anima and Elemental Aura can be changed without going into the full Character editor
- Mote committments can be marked as scenelong, causing them to lapse when the ST uses the 'end scene' control
- Battlegroups' Magnitude and Size can be adjusted without going into the full Battlegroup editor
- QCs and Battlegroups can now have 0s in pool ratings
- Total Spent XP/SXP/BP and Remaining XP/SXP are now displayed in the Character editor
- Better performance in the Character editor
- API responses now include created_at and updated_at timestamps
- Bug fixes (thanks Everspace, Madletter, Artirian_Legacy)

## v49

###### _May 1, 2018_

- Added 'Flaw' to the list of merit categories
- Storytellers can now delete Merits, Weapons, Charms of Characters/QCs/BGs in their Chronicles
- Page titles now include the name of the Character/QC/BG you're looking at
- Deleting Merits/Weapons/Charms is now more reliable
- Bug fixes

## v48

###### _Apr 22, 2018_

- Bug fixes

## v47

###### _Apr 22, 2018_

- Basic Excellency support for Dragon-Blooded exalts. This shows dice adding only - it does not include automatic success adders or any other bonuses. Ratings including Athletics, etc will be slightly off. This will be corrected in future updates
- Elemental Bolt Attack is now supported as a weapon. Add 'elemental bolt' and the specific aspect as tags to get correct range, tags, and bonuses calculated
- Added support for other weapon tags like balanced
- Attributes/Abilities with Excellencies now show a \* symbol on the character sheet
- Soak and Hardness ratings now factor in Twilight caste and Earth and Fire aspect anima powers
- Withdraw/Disengage ratings now factor in Water aspect anima powers
- Resolve ratings now take Well-Bred and Thin-Blooded into account
- Weapons can be assigned a different attribute than Strength for damage calculations
- Rating fields are a lot less janky when deleting contents or entering a negative number
- Character traits no longer flash back to their previous value after an edit
- Objects no longer jump around oddly before sorting
- The number of database queries needed for character updates or initial login have been greatly reduced, resulting in slightly quicker load times
- An error message will now be displayed instead of a blank screen if an error is encountered
- Flow type checking has been added to every JS and JSX file, which should hopefully prevent certain types of bugs in the future
- Improved automated test coverage
- Bug fixes

## v46

###### _Apr 14, 2018_

- Characters, QCs, and Battlegroups on the Characters page can be manually sorted just like Charms.
- STs can also sort Characters/etc on the Chronicle page
- Fix newly created Martial Arts Charms / Evocations / Spirit Charms not appearing on screen until it is refreshed
- Bug fixes

## v45

###### _Apr 10, 2018_

- Dragon-Blooded characters can now be created. Excellency and anima power support will come in a future release.
- STs can now delete Chronicles
- Temporary willpower can go above 10
- Slightly more automated test coverage than before

## v44

###### _Apr 6, 2018_

- Click on a dice pool to view a summary of what contributes to that pool
- Characters, QCs, and Battlegroups can now be marked as Public. Public Characters are viewable, but not editable, by anyone with the URL.
- Intimacies can now be hidden from other players in a Chronicle
- STs can now rename Chronicles
- Players can now leave Chronicles
- Merits, weapons, and many other list traits can be manually sorted
- Bug Fixes (thanks Wern212, Lumi)

## v43

###### _Apr 2, 2018_

- Major overhaul of the Charms page and Edit Charms page
- Charms and Spells can be manually sorted
- Charms and Spells now have zero or more custom Categories, like 'Attack,' 'Defense', or 'My Ultra One Hit KO Wolf Fang Fist Combo'
- Charms and Spells on the Charm list or editor can be filtered by category
- Native Charms can be filtered by Ability / Attribute
- Martial Arts Charms can be filtered by style
- Evocations can be filtered by Artifact name
- Spells can be filtered by Circle
- Improved Character list page
- Merits can now be ranked N/A, for all you Eye of Autochthon wielders out there
- Added XP Log and Solar XP Log (pre-filled with values from Spent XP and Spent Solar XP)
- Added BP Log
- Removed Spent XP and Spent Solar XP fields
- Characters can have multiple shaping rituals
- Rating fields for Attributes and Abilities now change to the number you expect instead of 5 if the cursor is not in the most auspicious spot (thanks /u/evilmegan)
- Slightly better handling of auth token expiration
- Bug fixes
- Forget about v42

## v41

###### _Mar 28, 2018_

- Dawn Caste Solars can now select Martial Arts as their Supernal ability (thanks /u/Ryoungoragla)
- Custom Ability Exalts can now have a Supernal ability
- Characters, QCs, and Battlegroups can now be removed form Chronicles
- Mute support for spending Peripheral motes

## v40

###### _Mar 26, 2018_

- Changing Solar Castes no longer throws an error if the new caste does not support your current caste/supernal selections (thanks /u/SparksMurphey)
- Changing Solar Supernal ability now adds the new Supernal to the list of Caste abilities
- Changing Solar Supernal ability with a full list of Caste abilities changes the last-selected ability to the new Supernal
- Selecting a Favored Attribute/Ability as Caste "Promotes" it to Caste

## v39

###### _Mar 26, 2018_

First Public Release
