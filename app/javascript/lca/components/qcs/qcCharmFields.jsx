// @flow
import { deepEqual } from 'fast-equals'
import React from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'

import BlockPaper from 'components/shared/BlockPaper'
import CharmTimingSelect from 'components/shared/selects/CharmTimingSelect'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import type { QcCharm } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

type Props = {
  charm: QcCharm,
  onCharmChange: Function,
  onRemoveClick: Function,
}
export default class QcCharmFields extends React.Component<Props> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { charm } = this.props

    if (deepEqual(charm[name], value)) return

    this.props.onCharmChange(charm.id, { [name]: value })
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.props.charm.id)
  }

  render() {
    const { charm } = this.props
    const { handleChange, handleRemove } = this

    return (
      <BlockPaper>
        <Typography
          component="div"
          style={{
            position: 'absolute',
            top: '0.5em',
            right: '0.5em',
            marginRight: '1em',
          }}
        >
          <Handle />
        </Typography>
        <TextField
          name="name"
          value={charm.name}
          label="Name"
          margin="dense"
          onChange={handleChange}
        />
        <RatingField
          trait="min_essence"
          value={charm.min_essence}
          label="Essence"
          margin="dense"
          narrow
          onChange={handleChange}
        />
        <TextField
          name="cost"
          value={charm.cost}
          label="Cost"
          margin="dense"
          onChange={handleChange}
        />
        <br />
        <CharmTimingSelect
          name="timing"
          value={charm.timing}
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <TextField
          name="duration"
          value={charm.duration}
          label="Duration"
          margin="dense"
          onChange={handleChange}
        />
        <TagsField
          trait="keywords"
          value={charm.keywords}
          label="Keywords (comma separated)"
          margin="dense"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="body"
          value={charm.body}
          label="Text"
          margin="dense"
          onChange={handleChange}
          fullWidth
          multiline
          rowsMax={5}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField
            name="ref"
            value={charm.ref}
            label="Reference"
            margin="dense"
            onChange={handleChange}
            style={{ flex: 2 }}
          />
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Button
              onClick={handleRemove}
              style={{ margin: '1.5em -0.75em -1em 3em' }}
            >
              Delete&nbsp;
              <Delete />
            </Button>
          </div>
        </div>
      </BlockPaper>
    )
  }
}
