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
type State = { charm: QcCharm }
export default class QcCharmFields extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      charm: this.props.charm,
    }
  }
  static getDerivedStateFromProps(props: Object) {
    return { charm: props.charm }
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    let { name, value } = e.target

    this.setState({ charm: { ...this.state.charm, [name]: value } })
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { charm } = this.props

    if (isEqual(charm[name], value)) return

    this.props.onCharmChange(charm.id, name, value)
  }

  handleRatingChange = (e: SyntheticInputEvent<>) => {
    let { name, value } = e.target
    const { charm } = this.state

    this.setState({ charm: { ...charm, [name]: value } })
    this.props.onCharmChange(charm.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.state.charm.id)
  }

  render() {
    const { charm } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this

    return (
      <div style={{ marginBottom: '0.75em' }}>
        <TextField
          name="name"
          value={charm.name}
          label="Name"
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <RatingField
          trait="min_essence"
          value={charm.min_essence}
          label="Essence"
          margin="dense"
          onChange={handleRatingChange}
        />
        <TextField
          name="cost"
          value={charm.cost}
          label="Cost"
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button onClick={handleRemove} style={{ float: 'right' }}>
          Delete&nbsp;
          <Delete />
        </Button>
        <br />
        <CharmTimingSelect
          name="timing"
          value={charm.timing}
          onChange={handleRatingChange}
        />&nbsp;&nbsp;
        <TextField
          name="duration"
          value={charm.duration}
          label="Duration"
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TagsField
          trait="keywords"
          value={charm.keywords}
          label="Keywords (comma separated)"
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        />
        <TextField
          name="body"
          value={charm.body}
          label="Text"
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
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
          onBlur={handleBlur}
        />
        <Divider style={{ marginTop: '0.5em' }} />
      </div>
    )
  }
}
