# frozen_string_literal: true

# app/serializers/custom_attribute_character_serializer.rb
class CustomAttributeCharacterSerializer < ExaltSerializer
  attributes :favored_abilities, :aura,
             :caste_attributes, :favored_attributes,
             :excellency, :excellency_stunt, :excellencies_for
end
