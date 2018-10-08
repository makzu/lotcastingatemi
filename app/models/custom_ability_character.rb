# frozen_string_literal: true

# Custom Ability Exalts, for more flexibility than is allowed to Solars
class CustomAbilityCharacter < Character
  include AbilityExalt
  include CustomExalt

  attribute :exalt_type, :string, default: 'Ability Exalt'
end
