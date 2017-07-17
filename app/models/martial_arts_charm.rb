# frozen_string_literal: true

# Validatitions and methods specific to Martial Arts Charms.
class MartialArtsCharm < Charm
  validates :min_ability, one_thru_five_stat: true
end
