import { Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import AnimaSelect from '@/components/generic/AnimaSelect'
import RatingField from '@/components/generic/RatingField'
import BlockPaper from '@/components/shared/BlockPaper'
import AuraSelect from '@/components/shared/selects/AuraSelect'
import commonStyles from '@/styles'
import {
  committedPeripheralMotes,
  committedPersonalMotes,
  showAuraTraits,
} from '@/utils/calculated'
import MoteCommittmentEditor from './moteCommittmentEditor'

const styles = (theme) => ({
  ...commonStyles(theme),
})

function MotePoolEditor({ character, onChange, classes }: Props) {
  if (character.type == 'Character' && !character.is_sorcerer) return <div />
  const showMoteTotalEditors =
    character.type == 'CustomAttributeCharacter' ||
    character.type == 'CustomAbilityCharacter' ||
    character.type == 'CustomEssenceCharacter'
  return (
    <BlockPaper>
      <Typography variant="h6">Mote Pools:</Typography>
      <Typography component="div" className="flexContainerWrap">
        {character.type !== 'Character' && (
          <>
            <div className={classes.flexCol}>
              <RatingField
                trait="motes_personal_current"
                value={character.motes_personal_current}
                label="Personal"
                max={
                  character.motes_personal_total -
                  committedPersonalMotes(character)
                }
                margin="dense"
                onChange={onChange}
              />
              <span className={classes.fieldSeparator}>/</span>
              {showMoteTotalEditors && (
                <RatingField
                  trait="motes_personal_total"
                  value={character.motes_personal_total}
                  label="Total"
                  margin="dense"
                  onChange={onChange}
                />
              )}
              {!showMoteTotalEditors && (
                <span className={classes.fieldSeparator}>
                  {character.motes_personal_total}
                </span>
              )}
            </div>
            <div className={classes.flexCol}>
              <RatingField
                trait="motes_peripheral_current"
                value={character.motes_peripheral_current}
                label="Peripheral"
                max={
                  character.motes_peripheral_total -
                  committedPeripheralMotes(character)
                }
                margin="dense"
                onChange={onChange}
              />
              <span className={classes.fieldSeparator}>/</span>
              {showMoteTotalEditors ? (
                <RatingField
                  trait="motes_peripheral_total"
                  value={character.motes_peripheral_total}
                  label="Total"
                  margin="dense"
                  onChange={onChange}
                />
              ) : (
                <span className={classes.fieldSeparator}>
                  {character.motes_peripheral_total}
                </span>
              )}
            </div>
          </>
        )}
        {character.is_sorcerer && (
          <div className={classes.flexCol}>
            <RatingField
              trait="sorcerous_motes"
              value={character.sorcerous_motes}
              label="Sorcerous"
              margin="dense"
              onChange={onChange}
            />
          </div>
        )}
      </Typography>

      <Typography component="div" className="flexContainerWrap">
        {character.type !== 'Character' && (
          <div className={classes.flexCol}>
            <AnimaSelect character={character} onChange={onChange} />
          </div>
        )}

        {showAuraTraits(character) && (
          <div className={classes.flexCol}>
            <AuraSelect character={character} onChange={onChange} />
          </div>
        )}
      </Typography>

      {character.type !== 'Character' && (
        <MoteCommittmentEditor character={character} onChange={onChange} />
      )}
    </BlockPaper>
  )
}

export default withStyles(styles)(MotePoolEditor)
