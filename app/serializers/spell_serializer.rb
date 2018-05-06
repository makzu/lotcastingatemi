# frozen_string_literal: true

# app/serializers/spell_serializer.rb
class SpellSerializer < CharacterTraitSerializer
  attributes :name, :cost, :duration, :circle, :control,
             :keywords, :body, :ref, :categories
end
