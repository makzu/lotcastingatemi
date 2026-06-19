# frozen_string_literal: true

# app/serializers/charm_serializer.rb
class CharmSerializer < CharacterTraitSerializer
  attributes :name, :charm_type, :cost, :timing, :duration,
             :keywords, :min_essence, :prereqs, :body, :ref,
             :categories, :loadouts, :summary
end
