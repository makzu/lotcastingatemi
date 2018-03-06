# frozen_string_literal: true

# Validatitions and methods specific to Martial Arts Charms.
class MartialArtsCharm < Charm
  validates :min_ability, one_thru_five_stat: true
<<<<<<< HEAD
  after_initialize :set_defaults

  private

  def set_defaults
    self.min_ability ||= 1
  end

  def entity_assoc
    'martial_arts_charm'
  end
=======
  attribute :min_ability, :integer, default: 1
>>>>>>> Lay groundwork for custom Attribute/Ability Exalts
end
