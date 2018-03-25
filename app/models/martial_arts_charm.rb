# frozen_string_literal: true

# Validatitions and methods specific to Martial Arts Charms.
class MartialArtsCharm < Charm
  attribute :min_ability, :integer, default: 1
  validates :min_ability, one_thru_five_stat: true

  attribute :ref, :string, default: 'Core p.426-464'

  def entity_assoc
    'martial_arts_charm'
  end
end
