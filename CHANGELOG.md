## v85

###### _Nov 25, 2019_

- Fixed spacing between Charm Essence minimum and Charm cost (Thanks Vejuz, Jancarius, and Wolfblade)
- Fixed weapons not being deletable (Thanks revmonty)

## v84

###### _Nov 11, 2019_

- Revamped navigation - now character sheet sections use the main drawer for navigation instead of tabs at the top.
- Characters, QCs, and Battlegroups now have their own independent list pages.
- Weapons can now use a custom attribute for Defense
- The weapon editor was rewritten from scratch and is much lighter in terms of code.
- The [Resources Page](./docs/resources.md) now includes links to published 3e content.

## v82

###### _Jul 5, 2019_

- Added a few links to the [Resources Page](./docs/resources.md)
- Fix bug with Exalt type changing (Thanks Maudova)
- Players should no longer be able to join a Chronicle multiple times and create duplicate entries in the player list (this does not get rid of existing duplicates) (Thanks everyone who reported this!)

## v81

###### _Mar 17, 2019_

- Fix bug with onslaught not affecting battlegroup defense (Thanks Maudova)
- Fix bug with stale sessions causing problems editing characters (Thanks Nirodha, Exthalion)

## v79

###### _Mar 12, 2019_

- Added Forms for Lunars and custom characters. Forms can include a QC ID, which creates a link in the character sheet to a specific QC
- Lunars and custom characters can now have tells and totem forms
- QCs can now be sorcerers
- QCs can now have Aura
- QCs now have a Feats of Strength pool and effective strength rating
- Added a button to refresh a Character/QC/BG from the server
- Battlegroups can now be marked as public just like characters and QCs
- Improved lazy-loading for public Characters/QCs/BGs
- Fixed QC actions not saving to the server properly (Thanks ɅLIΞN)
- Fixed downtime not working for DBs (Thanks Vejuz)
- Minor polish tweaks

## v78

###### _Feb 21, 2019_

- The character editor now counts the number of dots you have in Attributes, Abilities, Specialties, and Merits, to help make character creation a little easier
- Fixed newly created Merits, Weapons, Charms, etc sometimes appearing twice in the list
- Solar XP is now labeled as Lunar XP for Lunars, and will make a best guess at its label for custom exalts
- Charms with blank Attribute/Ability/Style/Artifact name can now be filtered

## v77

###### _Feb 19, 2019_

- Fixed Lunar excellency requirements for non-caste/non-favored Attributes (Thanks sigfriedmcwild)

## v76

###### _Feb 19, 2019_

- Lunar characters can now be created.
- Charms can now be Universal, meaning there is no Attribute or Ability associated with them
- The minimum Attribute for Lunar or Custom Attribute Exalt Charms can now be as high as 10
- QCs excellencies for the Senses pool now use the correct numbers (Thanks Dark Lord Alan)
- Major revamps to how the app works under the hood
- Minor tweaks and polish

## v75

###### _Jan 18, 2019_

- Hotfix for newly-created Charms, etc not appearing until a full refresh (Thanks Nirodha)

## v74

###### _Jan 17, 2019_

- Added a basic Help section
- Short blurbs will appear in the Merit editor for Merits that have some sort of effect on calculations
- The Bio page for Characters now includes XP totals at the bottom of the xp log
- Dragon-Blooded Excellency caps now round down for static ratings as per recent [errata](http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1275486#post1275486). Custom exalts still have the option to round up dice caps.
- Fixed some issues with characters/qcs/bgs not loading after duplicating

## v71

###### _Dec 20, 2018_

- Page numbers for _What Fire has Wrought_ content are now updated to reflect the Backer PDF
- Removed option to delete characters/qcs/etc from their cards on the Chronicle page.
- Added Earth Aspect Anima bonus to defense vs smashing attacks and grapples
- Close-ranged Archery attack pools now use the correct accuracy (Thanks Quasi)
- Tweaked Discord previews of public characters/qcs

## v70

###### _Dec 15, 2018_

- Fixed broken editors for XP logs, mote committments, QC actions, and others (Thanks Maudova, Nirodha, Moonsword)

## v69

###### _Dec 11, 2018_

- QC Attacks, Merits, and Charms can now be sorted
- Chronicle data is now downloaded as needed, rather than all at once when logging in
- API responses are now compressed by default, reducing data download size significantly
- Unnecessary library code has been removed, further reducing download size
- Some backend changes that will hopefully reduce server memory use
- Public character and QC links now show the character's name and description on Discord instead of a generic LCA blurb

## v64

###### _Nov 27, 2018_

- Added option to change a character's exalt type. Characters can be converted from any type to any type, even in ways that RAW won't allow

## v63

###### _Nov 19, 2018_

- Character sheets can now be duplicated just like QC/BG sheets
- The Excellency builder now includes a convenience menu for quickly duplicating Excellencies from the core book, _What Fire has Wrought_, and _Adversaries of the Righteous_
- The soak, hardness, and mobility penalty of armor can now have modifiers added to them
- 'As Solars' and 'As Dragon-Blooded' options in the excellency builder now work again (Thanks Grifftofer, Vejuz)
- ISoB control spell soak bonus now correctly applies to characters with armor (Thanks Yukizawa)
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
- Bug fixes (Thanks Everspace, Madletter, Artirian_Legacy)

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
- Bug Fixes (Thanks Wern212, Lumi)

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
- Rating fields for Attributes and Abilities now change to the number you expect instead of 5 if the cursor is not in the most auspicious spot (Thanks /u/evilmegan)
- Slightly better handling of auth token expiration
- Bug fixes
- Forget about v42

## v41

###### _Mar 28, 2018_

- Dawn Caste Solars can now select Martial Arts as their Supernal ability (Thanks /u/Ryoungoragla)
- Custom Ability Exalts can now have a Supernal ability
- Characters, QCs, and Battlegroups can now be removed form Chronicles
- Mute support for spending Peripheral motes

## v40

###### _Mar 26, 2018_

- Changing Solar Castes no longer throws an error if the new caste does not support your current caste/supernal selections (Thanks /u/SparksMurphey)
- Changing Solar Supernal ability now adds the new Supernal to the list of Caste abilities
- Changing Solar Supernal ability with a full list of Caste abilities changes the last-selected ability to the new Supernal
- Selecting a Favored Attribute/Ability as Caste "Promotes" it to Caste

## v39

###### _Mar 26, 2018_

First Public Release
