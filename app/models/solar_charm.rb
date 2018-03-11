# frozen_string_literal: true

# Validations and methods specific to Solar Charms.
class SolarCharm < Charm
  validates :ability, inclusion: { in: ABILITIES }, unless: :ability_blank?
  validates :min_ability, one_thru_five_stat: true

  attribute :min_ability, :integer, default: 1

  def entity_assoc
    'solar_charm'
  end

  private

  def ability_blank?
    ability.blank?
  end
end
