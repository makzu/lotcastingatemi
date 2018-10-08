# frozen_string_literal: true

# Custom Essence-based Exalts, like 2e Infernals
class CustomEssenceCharacter < Character
  include Exalt
  include CustomExalt

  attribute :exalt_type, :string, default: 'Essence Exalt'

  alias_attribute :charms, :essence_charms
end
