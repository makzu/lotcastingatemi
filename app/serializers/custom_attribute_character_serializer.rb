# frozen_string_literal: true

# app/serializers/custom_attribute_character_serializer.rb
class CustomAttributeCharacterSerializer < ExaltSerializer
  attributes :caste_abilities,  :favored_abilities,
             :caste_attributes, :favored_attributes
end
