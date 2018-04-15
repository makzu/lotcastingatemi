# frozen_string_literal: true

# Custom Essence-based Exalts, like 2e Infernals
class CustomEssenceCharacter < Character
  include Exalt

  attribute :exalt_type, :string, default: 'Essence Exalt'

  alias_attribute :charms, :custom_essence_charms

  def custom_exalt?
    true
  end
end
