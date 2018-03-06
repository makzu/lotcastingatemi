# frozen_string_literal: true

# Generic Charms for Custom Attribute Exalts
class CustomAttributeCharm < Charm
  include Constants
  alias_attribute :attr, :ability
  alias_attribute :min_attr, :min_ability

  attribute :min_attr, :integer, default: 1

  validates :min_attr, one_thru_five_stat: true

  validates :attr, inclusion: { in: Constants::ATTRIBUTES }
end
