# frozen_string_literal: true

# Custom Ability Exalts, for more flexibility than is allowed to Solars
class CustomAbilityCharacter < Character
  include AbilityExalt

  attribute :exalt_type, :string, default: 'Ability Exalt'

  def custom_exalt?
    true
  end
end
