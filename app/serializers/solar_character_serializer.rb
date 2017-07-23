# frozen_string_literal: true

# app/serializers/solar_character_serializer.rb
class SolarCharacterSerializer < CharacterSerializer
  attributes :motes_personal_current,   :motes_personal_total,
             :motes_peripheral_current, :motes_peripheral_total,
             :anima_level, :caste,

             :caste_abilities, :favored_abilities, :supernal_ability,

             :limit_trigger, :limit

  has_many :solar_charms
  has_many :martial_arts_charms
  has_many :evocations
end
