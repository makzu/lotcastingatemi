# frozen_string_literal: true

# Custom Ability Exalts, for more flexibility than is allowed to Solars
class CustomAbilityCharacter < Character
  include AbilityExalt

  attribute :exalt_type, :string, default: 'Ability Exalt'

  has_many :custom_ability_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :custom_ability_charms
end
