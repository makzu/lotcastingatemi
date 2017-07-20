# frozen_string_literal: true

# Validatitions and methods specific to Martial Arts Charms.
class MartialArtsCharm < Charm
  validates :min_ability, one_thru_five_stat: true

  # Ensure newly-created records have valid default values
  after_initialize do
    unless new_record?
      @min_ability = 1 if @min_ability.blank?
    end
  end
end
