import { Typography } from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import { sortOrderSort } from '@/utils'
import BattlegroupAttackDisplay from '../components/BattlegroupAttackDisplay'
import BattlegroupHealthDisplay from '../components/BattlegroupHealthDisplay'
import BattlegroupPoolDisplay from '../components/BattlegroupPoolDisplay'
import BgBox from '../components/BgBox'
import { bgSoak, prettyDrillRating } from '../lib'
import { useGetBattlegroupQuery } from '../store'

const BattlegroupSheet = () => {
  const id = useIdFromParams()
  const { data: battlegroup } = useGetBattlegroupQuery(id)

  useDocumentTitle(
    `${battlegroup && battlegroup.name + ' | '}Lot-Casting Atemi`,
  )

  if (!battlegroup)
    return (
      <BlockPaper>
        <Typography paragraph>This Battlegroup has not yet loaded.</Typography>
      </BlockPaper>
    )

  return (
    <BlockPaper>
      <MarkdownDisplay source={battlegroup.description} />

      <div className="flexContainerWrap">
        <BattlegroupHealthDisplay battlegroup={battlegroup} />

        <BattlegroupPoolDisplay
          value={prettyDrillRating(battlegroup)}
          label="Drill"
        />

        {battlegroup.might > 0 && (
          <BgBox>
            <BattlegroupPoolDisplay value={battlegroup.might} label="Might" />
          </BgBox>
        )}
        {battlegroup.perfect_morale && (
          <BgBox>
            <BattlegroupPoolDisplay value="Perfect" label="Morale" />
          </BgBox>
        )}
      </div>

      <div className="flexContainerWrap">
        <BgBox>
          <BattlegroupPoolDisplay
            value={battlegroup.join_battle}
            label="Join Battle"
          />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay
            label="Movement"
            value={battlegroup.movement}
          />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay label="Evasion" value={battlegroup.evasion} />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay label="Parry" value={battlegroup.parry} />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay label="Soak" value={bgSoak(battlegroup)} />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay
            label="Armor Name"
            value={battlegroup.armor_name ?? 'Unarmored'}
          />
        </BgBox>
        {battlegroup.hardness > 0 && (
          <BgBox>
            <BattlegroupPoolDisplay
              label="Hardness"
              value={battlegroup.hardness}
            />
          </BgBox>
        )}
      </div>

      <div className="flexContainerWrap">
        <BgBox>
          <BattlegroupPoolDisplay label="Senses" value={battlegroup.senses} />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay label="Resolve" value={battlegroup.resolve} />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay label="Guile" value={battlegroup.guile} />
        </BgBox>
        <BgBox>
          <BattlegroupPoolDisplay
            label="Appearance"
            value={battlegroup.appearance}
          />
        </BgBox>
      </div>

      <div>Attacks</div>
      {battlegroup.qc_attacks.sort(sortOrderSort).map((attack) => (
        <BattlegroupAttackDisplay
          battlegroup={battlegroup}
          attack={attack}
          key={attack.id}
        />
      ))}
    </BlockPaper>
  )
}

export default BattlegroupSheet
