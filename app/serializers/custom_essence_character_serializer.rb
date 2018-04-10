# frozen_string_literal: true

# app/serializers/custom_essence_character_serializer.rb
class CustomEssenceCharacterSerializer < ExaltSerializer
  attributes :favored_abilities, :aura,
             :excellency, :excellency_stunt, :excellencies_for
end
