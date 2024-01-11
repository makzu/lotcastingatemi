import * as React from 'react'

import Button from '@material-ui/core/Button'
// import Checkbox from '@material-ui/core/Checkbox'
import { WithStyles } from '@material-ui/core/styles'
import Delete from '@material-ui/icons/Delete'

import BlockPaper from 'components/generic/blockPaper'
import TagsField from 'components/generic/TagsField'
import TextField from 'components/generic/TextField'
import Checkbox from 'components/shared/inputs/Checkbox'
import SpellCircleSelect from 'components/shared/selects/SpellCircleSelect'
import commonStyles from 'styles'
import { Spell } from 'types'

interface Props extends WithStyles<typeof commonStyles> {
  spell: Spell
  handleChange(id: number, trait: $TSFixMe): void
  handleDestroy(id: number): void
}

const QcSpellFields = ({
  spell,
  handleChange,
  handleDestroy,
  classes,
}: Props) => {
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(spell.id, { [target.name]: target.value })

  return (
    <BlockPaper>
      <TextField
        name="name"
        value={spell.name}
        onChange={onChange}
        label="Name"
        margin="dense"
        fullWidth
        inputProps={{
          autocomplete: 'off',
          'data-1p-ignore': 'true',
          'data-lp-ignore': 'true',
        }}
      />
      <div className={classes.flexContainer}>
        <TextField
          name="cost"
          value={spell.cost}
          onChange={onChange}
          label="Cost"
          margin="dense"
          style={{ flex: 1 }}
        />
        <SpellCircleSelect spell={spell} onChange={onChange} />
      </div>

      <div className={classes.flexContainer}>
        <TextField
          name="duration"
          value={spell.duration}
          onChange={onChange}
          label="Duration"
          margin="dense"
          style={{ flex: 1 }}
        />

        <Checkbox
          name="control"
          label="Control Spell"
          value={spell.control}
          onChange={onChange}
        />
      </div>

      <TagsField
        trait="keywords"
        value={spell.keywords}
        onChange={onChange}
        fullWidth
        label="Keywords (comma separated)"
        margin="dense"
      />

      <TextField
        name="body"
        value={spell.body}
        onChange={onChange}
        multiline
        fullWidth
        label="Effect"
        margin="dense"
        rows={2}
        rowsMax={15}
      />

      <div className={classes.flexContainer}>
        <TextField
          name="ref"
          value={spell.ref}
          onChange={onChange}
          label="Reference"
          margin="dense"
          style={{ flex: 1 }}
        />

        <Button onClick={() => handleDestroy(spell.id)}>
          Delete
          <Delete />
        </Button>
      </div>
    </BlockPaper>
  )
}
export default QcSpellFields
