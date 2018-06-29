// @flow
import { isEqual } from 'lodash'
import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Delete from '@material-ui/icons/Delete'

import CharmTimingSelect from 'components/generic/CharmTimingSelect'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import type { QcCharm } from 'utils/flow-types'

type Props = {
  charm: QcCharm,
  onCharmChange: Function,
  onRemoveClick: Function,
}
export default class QcCharmFields extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { charm } = this.props

    if (isEqual(charm[name], value)) return

    this.props.onCharmChange(charm.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.props.charm.id)
  }

  render() {
    const { charm } = this.props
    const { handleChange, handleRemove } = this

    return (
      <div style={{ marginBottom: '0.75em' }}>
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
          onChange={handleChange}
        />
        <TextField
          name="cost"
          value={charm.cost}
          label="Cost"
          margin="dense"
          onChange={handleChange}
        />
        <Button onClick={handleRemove} style={{ float: 'right' }}>
          Delete&nbsp;
          <Delete />
        </Button>
        <br />
        <CharmTimingSelect
          name="timing"
          value={charm.timing}
          onChange={handleChange}
        />&nbsp;&nbsp;
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
          fullWidth={true}
          multiline
          rowsMax={5}
        />
        <br />
        <TextField
          name="ref"
          value={charm.ref}
          label="Reference"
          margin="dense"
          onChange={handleChange}
        />
        <Divider style={{ marginTop: '0.5em' }} />
      </div>
    )
  }
}
