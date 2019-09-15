import { deepEqual } from 'fast-equals'
import * as React from 'react'
const { Component } = React
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import Button from '@material-ui/core/Button'
// import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import { IconButton } from '@material-ui/core'
import BlockPaper from 'components/generic/blockPaper'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import Checkbox from 'components/shared/inputs/Checkbox'
import SpellCircleSelect from 'components/shared/selects/SpellCircleSelect'
import commonStyles from 'styles'
import { Spell } from 'types'
import { checkVisible } from 'utils'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

interface Props extends WithStyles<typeof commonStyles> {
  spell: Spell
  handleChange(id: number, trait: any): void
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
        <SpellCircleSelect spell={spell} handleChange={onChange} />
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
          checked={spell.control}
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
