import { deepEqual } from 'fast-equals'
import * as React from 'react'
const { Component } = React
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import Button from '@mui/material/Button'
// import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import { WithStyles } from '@mui/styles'
import withStyles from '@mui/styles/withStyles'
import MuiTextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import { IconButton } from '@mui/material'
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
        maxRows={15}
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
