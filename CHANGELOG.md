## v56
###### *June 28, 2018*
* Battlegroup cards now include the same pools and ratings as QC cards
* Bug fixes (Thanks Maudova, Yukizawa)
* Added Patreon link

## v55
###### *June 23, 2018*
* Bug fixes (Thanks Havoc)

## v50
###### *June 20, 2018*
* **Initiative Tracker**: A pared-down version of the Characters page, showing Characters/QCs/Battlegroups in Initiative order. Includes quick access to controls for editing initiative and onslaught penalties.
* **ST controls**: A simple control panel on the Chronicle dashboard enables STs to end all scenelong effects, recover motes or willpower, and more
* Certain fields like Character descriptions, Charm/Spell/Merit bodies, and charm summaries now support Markdown formatting, which enables things like images, tables, and lists.
* Added Elemental Aura display to character cards
* Anima and Elemental Aura can be changed without going into the full Character editor
* Mote committments can be marked as scenelong, causing them to lapse when the ST uses the 'end scene' control
* Battlegroups' Magnitude and Size can be adjusted without going into the full Battlegroup editor
* QCs and Battlegroups can now have 0s in pool ratings
* Total Spent XP/SXP/BP and Remaining XP/SXP are now displayed in the Character editor
* Better performance in the Character editor
* API responses now include created_at and updated_at timestamps
* Bug fixes (thanks Everspace, Madletter, Artirian_Legacy)

## v49
###### *May 1, 2018*
* Added 'Flaw' to the list of merit categories
* Storytellers can now delete Merits, Weapons, Charms of Characters/QCs/BGs in their Chronicles
* Page titles now include the name of the Character/QC/BG you're looking at
* Deleting Merits/Weapons/Charms is now more reliable
* Bug fixes

## v48
###### *Apr 22, 2018*
* Bug fixes

## v47
###### *Apr 22, 2018*
* Basic Excellency support for Dragon-Blooded exalts. This shows dice adding only - it does not include automatic success adders or any other bonuses. Ratings including Athletics, etc will be slightly off. This will be corrected in future updates
* Elemental Bolt Attack is now supported as a weapon. Add 'elemental bolt' and the specific aspect as tags to get correct range, tags, and bonuses calculated
* Added support for other weapon tags like balanced
* Attributes/Abilities with Excellencies now show a * symbol on the character sheet
* Soak and Hardness ratings now factor in Twilight caste and Earth and Fire aspect anima powers
* Withdraw/Disengage ratings now factor in Water aspect anima powers
* Resolve ratings now take Well-Bred and Thin-Blooded into account
* Weapons can be assigned a different attribute than Strength for damage calculations
* Rating fields are a lot less janky when deleting contents or entering a negative number
* Character traits no longer flash back to their previous value after an edit
* Objects no longer jump around oddly before sorting
* The number of database queries needed for character updates or initial login have been greatly reduced, resulting in slightly quicker load times
* An error message will now be displayed instead of a blank screen if an error is encountered
* Flow type checking has been added to every JS and JSX file, which should hopefully prevent certain types of bugs in the future
* Improved automated test coverage
* Bug fixes

## v46
###### *Apr 14, 2018*
* Characters, QCs, and Battlegroups on the Characters page can be manually sorted just like Charms.
* STs can also sort Characters/etc on the Chronicle page
* Fix newly created Martial Arts Charms / Evocations / Spirit Charms not appearing on screen until it is refreshed
* Bug fixes

## v45
###### *Apr 10, 2018*
* Dragon-Blooded characters can now be created. Excellency and anima power support will come in a future release.
* STs can now delete Chronicles
* Temporary willpower can go above 10
* Slightly more automated test coverage than before

## v44
###### *Apr 6, 2018*
* Click on a dice pool to view a summary of what contributes to that pool
* Characters, QCs, and Battlegroups can now be marked as Public. Public Characters are viewable, but not editable, by anyone with the URL.
* Intimacies can now be hidden from other players in a Chronicle
* STs can now rename Chronicles
* Players can now leave Chronicles
* Merits, weapons, and many other list traits can be manually sorted
* Bug Fixes (thanks Wern212, Lumi)

## v43
###### *Apr 2, 2018*
* Major overhaul of the Charms page and Edit Charms page
* Charms and Spells can be manually sorted
* Charms and Spells now have zero or more custom Categories, like 'Attack,' 'Defense', or 'My Ultra One Hit KO Wolf Fang Fist Combo'
* Charms and Spells on the Charm list or editor can be filtered by category
* Native Charms can be filtered by Ability / Attribute
* Martial Arts Charms can be filtered by style
* Evocations can be filtered by Artifact name
* Spells can be filtered by Circle
* Improved Character list page
* Merits can now be ranked N/A, for all you Eye of Autochthon wielders out there
* Added XP Log and Solar XP Log (pre-filled with values from Spent XP and Spent Solar XP)
* Added BP Log
* Removed Spent XP and Spent Solar XP fields
* Characters can have multiple shaping rituals
* Rating fields for Attributes and Abilities now change to the number you expect instead of 5 if the cursor is not in the most auspicious spot (thanks /u/evilmegan)
* Slightly better handling of auth token expiration
* Bug fixes
* Forget about v42

## v41
###### *Mar 28, 2018*
* Dawn Caste Solars can now select Martial Arts as their Supernal ability (thanks /u/Ryoungoragla)
* Custom Ability Exalts can now have a Supernal ability
* Characters, QCs, and Battlegroups can now be removed form Chronicles
* Mute support for spending Peripheral motes

## v40
###### *Mar 26, 2018*
* Changing Solar Castes no longer throws an error if the new caste does not support your current caste/supernal selections (thanks /u/SparksMurphey)
* Changing Solar Supernal ability now adds the new Supernal to the list of Caste abilities
* Changing Solar Supernal ability with a full list of Caste abilities changes the last-selected ability to the new Supernal
* Selecting a Favored Attribute/Ability as Caste "Promotes" it to Caste

## v39
###### *Mar 26, 2018*
First Public Release
