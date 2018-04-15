# frozen_string_literal: true

# Spirit Charms, learnable by Eclipses
# This class is DEPRECATED
class SpiritCharm < Charm
  attribute :name, :string, default: 'New Spirit Charm'

  def entity_assoc
    'spirit_charm'
  end
end
