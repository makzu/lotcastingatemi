import PoolDisplayLabel from '@/components/displays/DisplayLabel'
import PoolDisplayNumericValue from '@/components/displays/PoolDisplayNumericValue'
import PoolDisplayStringValue from '@/components/displays/PoolDisplayStringValue'

interface Props {
  label: string
  value: number | string
}

const BattlegroupPoolDisplay = (props: Props) => {
  const isString = typeof props.value === 'string'
  const ValueDisplay = isString
    ? PoolDisplayStringValue
    : PoolDisplayNumericValue

  return (
    <div>
      <PoolDisplayLabel>{props.label}</PoolDisplayLabel>
      <ValueDisplay>{props.value}</ValueDisplay>
    </div>
  )
}

export default BattlegroupPoolDisplay
