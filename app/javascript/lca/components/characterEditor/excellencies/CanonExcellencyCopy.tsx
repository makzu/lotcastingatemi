import { Button, Menu, MenuItem } from '@mui/material'

import { useMenuLogic } from '@/hooks'

const copyTargets = {
  solar: {
    excellency: 'solar',
    excellency_stunt: '',
    excellencies_for: ['solar'],
  },
  dragonblood: {
    excellency: 'dragonblood',
    excellency_stunt: '',
    excellencies_for: ['dragonblood'],
  },
  lunar: {
    excellency: 'attribute',
    excellency_stunt: 'attribute+otherattribute',
    excellencies_for: ['lunar'],
  },
  sidereal: {
    excellency: 'sidereal',
    excellency_stunt: '',
    excellencies_for: ['sidereal'],
  },
  liminal: {
    excellency: 'attribute+essenceonanima',
    excellency_stunt: '',
  },
  revana: {
    excellency: 'attribute',
    excellency_stunt: 'attribute+ability',
  },
  odara: {
    excellency: 'attribute+anima',
    excellency_stunt: 'attribute+subtleanima',
  },
}

interface Props {
  onChangeMulti: $TSFixMeFunction
}

const CanonExcellencyCopier = ({ onChangeMulti }: Props) => {
  const [anchor, open, close] = useMenuLogic()

  const handleChange = (target: keyof typeof copyTargets) => {
    onChangeMulti(copyTargets[target])
    close()
  }

  return (
    <>
      <Button onClick={open}>Copy Canon Excellency...</Button>

      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
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
