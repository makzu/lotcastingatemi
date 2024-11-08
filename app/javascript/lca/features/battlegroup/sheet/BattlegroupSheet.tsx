import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import BattlegroupAttackDisplay from '../components/BattlegroupAttackDisplay'
import BattlegroupHealthDisplay from '../components/BattlegroupHealthDisplay'
import BattlegroupPoolDisplay from '@/components/displays/pools/BattlegroupPoolDisplay'
import { bgSoak, prettyDrillRating } from '../lib'
import { useGetBattlegroupQuery } from '../store'
import PoolStack from '@/components/shared/PoolStack'
import ResourceDisplay from '@/components/displays/ResourceDisplay'

const BattlegroupSheet = () => {
  const id = useIdFromParams()
  const { data: battlegroup, isLoading, error } = useGetBattlegroupQuery(id)

  useDocumentTitle(
    `${battlegroup && battlegroup.name + ' | '}Lot-Casting Atemi`,
  )

  if (isLoading) return <BlockPaper>Loading...</BlockPaper>
  if (error) return <BlockPaper>Error: {JSON.stringify(error)}</BlockPaper>

  if (!battlegroup)
    return (
      <BlockPaper>
        <Typography paragraph>This Battlegroup has not yet loaded.</Typography>
      </BlockPaper>
    )

  return (
    <>
      {battlegroup.description && (
        <BlockPaper>
          <MarkdownDisplay source={battlegroup.description} />
        </BlockPaper>
      )}

      <BlockPaper>
        <PoolStack>
          <BattlegroupHealthDisplay battlegroup={battlegroup} />

          <ResourceDisplay
            label="Willpower"
            current={battlegroup.willpower_temporary}
            total={battlegroup.willpower_permanent}
          />

          <BattlegroupPoolDisplay
            value={prettyDrillRating(battlegroup)}
            label="Drill"
          />

          {battlegroup.might > 0 && (
            <BattlegroupPoolDisplay value={battlegroup.might} label="Might" />
          )}
          {battlegroup.perfect_morale && (
            <BattlegroupPoolDisplay value="Perfect" label="Morale" />
          )}
        </PoolStack>

        <PoolStack>
          <BattlegroupPoolDisplay label="Evasion" value={battlegroup.evasion} />

          <BattlegroupPoolDisplay label="Parry" value={battlegroup.parry} />

          <BattlegroupPoolDisplay label="Soak" value={bgSoak(battlegroup)} />

          {battlegroup.hardness > 0 && (
            <BattlegroupPoolDisplay
              label="Hardness"
              value={battlegroup.hardness}
            />
          )}

          <BattlegroupPoolDisplay
            label="Armor Name"
            value={battlegroup.armor_name ?? 'Unarmored'}
          />
        </PoolStack>

        <PoolStack>
          <BattlegroupPoolDisplay
            value={battlegroup.join_battle}
            label="Join Battle"
          />

          <BattlegroupPoolDisplay
            value={battlegroup.willpower_permanent}
            label="vs Rout"
          />

          <BattlegroupPoolDisplay
            label="Movement"
            value={battlegroup.movement}
          />
        </PoolStack>

        <PoolStack>
          <BattlegroupPoolDisplay label="Senses" value={battlegroup.senses} />

          <BattlegroupPoolDisplay label="Resolve" value={battlegroup.resolve} />

          <BattlegroupPoolDisplay label="Guile" value={battlegroup.guile} />

          <BattlegroupPoolDisplay
            label="Appearance"
            value={battlegroup.appearance}
          />
        </PoolStack>
      </BlockPaper>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Attacks
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell sx={{ textAlign: 'right', width: '10em' }}>
                Attack
              </TableCell>
              <TableCell sx={{ textAlign: 'right', width: '10em' }}>
                Damage
              </TableCell>
              <TableCell sx={{ width: '11em' }}>Range</TableCell>
              <TableCell>Tags</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {battlegroup.qc_attacks.map((attack) => (
              <BattlegroupAttackDisplay
                key={attack.id}
                battlegroup={battlegroup}
                attack={attack}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {battlegroup.portrait_link && (
        <div>
          <a href={battlegroup.portrait_link}>
            <img
              src={battlegroup.portrait_link}
              alt={battlegroup.name}
              className="portrait"
            />
          </a>
        </div>
      )}
    </>
  )
}

export default BattlegroupSheet
