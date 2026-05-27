import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'

import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.jsx'
import type { Spell } from '@lca/types'

const useStyles = makeStyles((_theme) => ({
  expandedSummary: {
    marginBottom: '-20px',
  },
}))

interface Props {
  spell: Spell
  isOpen: boolean
  setOpenSpell: React.Dispatch<React.SetStateAction<number>>
}

const FullSpellDisplay = ({ spell, isOpen, setOpenSpell }: Props) => {
  const classes = useStyles()
  const id = `spell-accordion-${spell.id}`
  const handleChange = (_event: React.ChangeEvent, isExpanded: boolean) => {
    setOpenSpell(isExpanded ? spell.id : 0)
  }

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
        classes={{ expanded: classes.expandedSummary }}
      >
        <div>
          <Typography variant="h6">{spell.name}</Typography>
          {spell.control && (
            <Typography variant="caption">Control Spell</Typography>
          )}
          <Collapse in={!isOpen}>
            <Typography variant="caption" className="capitalize">
              {spell.cost}, {spell.duration}
            </Typography>
            <MarkdownDisplay
              source={
                spell.body.substring(0, 200) +
                (spell.body.length > 200 ? '...' : '')
              }
              noBlocks
            />
          </Collapse>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div>
          <Typography>
            <div>
              <strong>Circle:</strong>&nbsp;
              <span className="capitalize">{spell.circle}</span>
            </div>
            <div>
              <strong>Cost:</strong> {spell.cost}&nbsp;
            </div>
            <div>
              <strong>Keywords:</strong>&nbsp;
              <span className="capitalize">
                {spell.keywords.join(', ') || 'None'}
              </span>
            </div>
            <div>
              <strong>Duration:</strong> &nbsp;
              <span className="capitalize">{spell.duration}</span>
            </div>
          </Typography>

          <MarkdownDisplay source={spell.body} />

          {spell.ref !== '' && (
            <Typography variant="caption">Ref: {spell.ref}</Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default FullSpellDisplay
