# frozen_string_literal: true

# Generic Charms for Custom Attribute Exalts
# This class is DEPRECATED
class CustomAttributeCharm < Charm
  include Constants
  attribute :min_ability, :integer, default: 1
  attribute :ability,     :string,  default: ''

  alias_attribute :attr, :ability
  alias_attribute :min_attr, :min_ability

  validates :min_ability, one_thru_five_stat: true

  validates :ability, inclusion: { in: Constants::ATTRIBUTES }, unless: :ability_blank?

  private

  def ability_blank?
    ability.blank?
  end
end
