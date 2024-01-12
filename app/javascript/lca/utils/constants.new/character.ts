export const SolarCharacter = 'SolarCharacter'
export const DragonbloodCharacter = 'DragonbloodCharacter'
export const LunarCharacter = 'LunarCharacter'
export const SiderealCharacter = 'SiderealCharacter'
export const AbyssalCharacter = 'AbyssalCharacter'

export const CustomAbilityCharacter = 'CustomAbilityCharacter'
export const CustomAttributeCharacter = 'CustomAttributeCharacter'
export const CustomEssenceCharacter = 'CustomEssenceCharacter'

export const Character = 'Character'

export const CharacterTypes = [
  Character,
  SolarCharacter,
  DragonbloodCharacter,
  LunarCharacter,
  SiderealCharacter,
  AbyssalCharacter,
  CustomAbilityCharacter,
  CustomAttributeCharacter,
  CustomEssenceCharacter,
] as const

export type CharacterType = (typeof CharacterTypes)[number]
