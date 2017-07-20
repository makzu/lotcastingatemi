# frozen_string_literal: true

# Validations and methods specific to Solar Charms.
class SolarCharm < Charm
  validates :ability, inclusion: { in: ABILITIES }
  validates :min_ability, one_thru_five_stat: true

  # Ensure newly-created records have valid default values
  after_initialize do
    unless new_record?
      @ability = ABILITIES.first if @ability.blank?
      @min_ability = 1 if @min_ability.blank?
    end
  end
end
