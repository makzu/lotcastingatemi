// @flow
import React, { PureComponent } from 'react'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class CanonExcellencyCopier extends PureComponent<
  { onChangeMulti: Function },
  { anchor: any }
> {
  state = { anchor: null }

  handleOpen = (e: SyntheticEvent) => {
    this.setState({ anchor: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchor: null })
  }

  handleChange = (target: string) => {
    const { onChangeMulti } = this.props
    let obj = {}
    switch (target) {
      case 'solar':
        obj = {
          excellency: 'solar',
          excellency_stunt: '',
          excellencies_for: ['solar'],
        }
        break
      case 'dragonblood':
        obj = {
          excellency: 'dragonblood',
          excellency_stunt: '',
          excellencies_for: ['dragonblood'],
        }
        break
      case 'lunar':
        obj = {
          excellency: 'attribute',
          excellency_stunt: 'attribute+otherattribute',
        }
        break
      case 'sidereal':
        obj = { excellency: 'essence+nohalf', excellency_stunt: '' }
        break
      case 'liminal':
        obj = { excellency: 'attribute+essenceonanima', excellency_stunt: '' }
        break
      case 'revana':
        obj = { excellency: 'attribute', excellency_stunt: 'attribute+ability' }
        break
      case 'odara':
        obj = {
          excellency: 'attribute+anima',
          excellency_stunt: 'attribute+subtleanima',
        }
        break
    }
    onChangeMulti(obj)
    this.handleClose()
  }

  render() {
    const { anchor } = this.state
    const { handleOpen, handleClose, handleChange } = this
    return (
      <>
        <Button onClick={handleOpen}>Copy Canon Excellency...</Button>

        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
          <MenuItem onClick={() => handleChange('solar')}>
            Solar/Abyssal
          </MenuItem>
          <MenuItem onClick={() => handleChange('dragonblood')}>
            Dragon-Blooded
          </MenuItem>
          <MenuItem onClick={() => handleChange('lunar')}>Lunar</MenuItem>
          <MenuItem onClick={() => handleChange('sidereal')}>Sidereal</MenuItem>
          <MenuItem onClick={() => handleChange('liminal')}>Liminal</MenuItem>
          <MenuItem onClick={() => handleChange('revana')}>
            Revana Quinn (Core book Exigent)
          </MenuItem>
          <MenuItem onClick={() => handleChange('odara')}>
            Odara, Chosen of Ash (AotR Exigent)
          </MenuItem>
        </Menu>
      </>
    )
  }
}

export default CanonExcellencyCopier
