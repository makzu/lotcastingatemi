# frozen_string_literal: true

# app/serializers/ability_charm_serializer.rb
class AbilityCharmSerializer < CharmSerializer
  attributes :ability, :min_ability

  has_many :charm_loadouts
  def charm_loadouts
    object.charm_loadouts.pluck(:id)
  end
end
