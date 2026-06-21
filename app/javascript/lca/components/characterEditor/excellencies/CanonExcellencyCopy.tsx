import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import type { Character } from '@lca/types/character.ts'

interface Props {
  onChangeMulti: Function
}

const excellencyPayload = (target: string) => {
  let obj:
    | (Pick<Character, 'excellency' | 'excellency_stunt'> &
        Partial<Pick<Character, 'excellencies_for'>>)
    | undefined
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
        excellencies_for: ['lunar'],
      }
      break
    case 'sidereal':
      obj = {
        excellency: 'sidereal',
        excellency_stunt: '',
        excellencies_for: ['sidereal'],
      }
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
  return obj
}

const CanonExcellencyCopier = (props: Props) => {
  const [anchor, setAnchor] = useState<Element | null>(null)

  const handleChange = (target: string) => {
    const payload = excellencyPayload(target)

    if (payload === undefined) return

    props.onChangeMulti(payload)
    setAnchor(null)
  }

  return (
    <>
      <Button onClick={(e) => setAnchor(e.currentTarget)}>
        Copy Canon Excellency...
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        <MenuItem onClick={() => handleChange('solar')}>Solar/Abyssal</MenuItem>
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

export default CanonExcellencyCopier
