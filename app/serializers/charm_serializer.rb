# frozen_string_literal: true

# app/serializers/charm_serializer.rb
class CharmSerializer < CharacterTraitSerializer
  attributes :name, :charm_type, :cost, :timing, :duration,
             :keywords, :min_essence, :prereqs, :body, :ref,
             :categories, :summary

  attributes :ability, :min_ability, if: -> { charm.is_a?(Charms::AbilityCharm) || charm.is_a?(Charms::AttributeCharm) }
end
