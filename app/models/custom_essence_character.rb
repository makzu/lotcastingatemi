# frozen_string_literal: true

# Custom Essence-based Exalts, like 2e Infernals
class CustomEssenceCharacter < Character
  include Exalt

  attribute :exalt_type, :string, default: 'Essence Exalt'

  has_many :custom_essence_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :custom_essence_charms
end
