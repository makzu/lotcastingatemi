# frozen_string_literal: true

# app/serializers/custom_ability_character_serializer.rb
class CustomAbilityCharacterSerializer < ExaltSerializer
  attributes :caste_abilities, :favored_abilities, :supernal_ability,
             :excellency, :excellency_stunt, :excellencies_for
end
