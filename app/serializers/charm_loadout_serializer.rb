# frozen_string_literal: true

# Serializer for Charm Loadouts
class CharmLoadoutSerializer < BaseSerializer
  attributes :name, :active, :sorting

  # We only need IDs because the actual charm data is in the character's charms
  has_many :charms # , serializer: IdOnlySerializer
  def charms
    object.charms.pluck(:id)
  end
end
