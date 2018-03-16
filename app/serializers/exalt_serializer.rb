# frozen_string_literal: true

# app/serializers/solar_character_serializer.rb
class ExaltSerializer < CharacterSerializer
  attributes :motes_personal_current,   :motes_personal_total,
             :motes_peripheral_current, :motes_peripheral_total,
             :motes_committed,
             :anima_level, :caste, :exalt_type, :aspect, :anima_display,
             :limit_trigger, :limit, :resources

  has_many :charms
  has_many :martial_arts_charms
  has_many :evocations
  has_many :spirit_charms
end
