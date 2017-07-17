# frozen_string_literal: true

# Validations and methods specific to Solar Charms.
class SolarCharm < Charm
  validates :ability, inclusion: { in: ABILITIES }
  validates :min_ability, one_thru_five_stat: true
end
