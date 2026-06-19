import Accordion, { type AccordionProps } from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Check } from '@material-ui/icons'
import ExpandMore from '@material-ui/icons/ExpandMore'

import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import { useAppSelector } from '@lca/hooks'
import { getSpecificCharacter } from '@lca/selectors'
import type { Charm } from '@lca/types'
import {
  isInstalledCharm,
  isNativeCharm,
  showLoadoutTraits,
} from '@lca/utils/calculated'
import AbbreviatedCharmSummary from './AbbreviatedCharmSummary'

const useStyles = makeStyles((_theme) => ({
  summary: {
    alignItems: 'flex-start',
  },
  summaryButton: {
    '&.Mui-expanded': {
      marginRight: '-0.5em',
    },
  },
  expandedSummary: {
    marginBottom: '-20px',
  },
}))

interface Props {
  charm: Charm
  isOpen: boolean
  setOpenCharm: React.Dispatch<React.SetStateAction<number>>
}

const FullCharmDisplay = ({ charm, isOpen, setOpenCharm }: Props) => {
  const classes = useStyles()
  const id = `charm-accordion-${charm.id}`
  const handleChange: AccordionProps['onChange'] = (_e, isExpanded) => {
    setOpenCharm(isExpanded ? charm.id : 0)
  }
  const character = useAppSelector((state) =>
    getSpecificCharacter(state, charm.character_id),
  )

  const isInstalled =
    isNativeCharm(charm) &&
    isInstalledCharm(character, charm) &&
    showLoadoutTraits(character)

  return (
    <Accordion
      expanded={isOpen}
      TransitionProps={{ unmountOnExit: true }}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`${id}-header`}
        aria-controls={`${id}-content`}
        classes={{
          root: classes.summary,
          expanded: classes.expandedSummary,
          expandIcon: classes.summaryButton,
        }}
      >
        <div>
          <Typography variant="h6">
            {isInstalled && (
              <>
                <Check />
                &nbsp;
              </>
            )}
            {charm.name}
          </Typography>
          <AbbreviatedCharmSummary charm={charm} isOpen={isOpen} />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div>
          <Typography component="div">
            <div>
              <strong>Cost:</strong> {charm.cost};&nbsp;
              <strong>Mins:</strong>&nbsp;
              {charm.ability && (
                <span className="capitalize">
                  {charm.ability} {charm.min_ability}
                  ,&nbsp;
                </span>
              )}
              {charm.charm_type === 'MartialArts' && (
                <span className="capitalize">
                  Martial Arts ({charm.style} style) {charm.min_ability}
                  ,&nbsp;
                </span>
              )}
              Essence {charm.min_essence}
            </div>
            <div>
              <strong>Type:</strong>&nbsp;
              <span className="capitalize">{charm.timing}</span>
            </div>
            <div>
              <strong>Keywords:</strong>&nbsp;
              <span className="capitalize">
                {charm.keywords.join(', ') || 'None'}
              </span>
            </div>
            <div>
              <strong>Duration:</strong> &nbsp;
              <span className="capitalize">{charm.duration}</span>
            </div>
            <strong>Prerequisite Charms:</strong> {charm.prereqs || 'None'}
          </Typography>

          <MarkdownDisplay source={charm.body} />

          {charm.ref !== '' && (
            <Typography variant="caption">Ref: {charm.ref}</Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default FullCharmDisplay
