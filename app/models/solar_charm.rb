# frozen_string_literal: true

# Validations and methods specific to Solar Charms.
class SolarCharm < Charm
  validates :ability, inclusion: { in: ABILITIES }, unless: :ability_blank?
  validates :min_ability, one_thru_five_stat: true

  after_initialize :set_defaults

  private

  def ability_blank?
    ability.blank?
  end

  def set_defaults
    self.min_ability ||= 1
  end
end
