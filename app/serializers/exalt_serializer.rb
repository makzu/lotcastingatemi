# frozen_string_literal: true

# app/serializers/solar_character_serializer.rb
class ExaltSerializer < CharacterSerializer
  attributes :motes_personal_current,   :motes_personal_total,
             :motes_peripheral_current, :motes_peripheral_total,
             :motes_committed,
             :anima_level, :anima_powers, :anima_display,
             :caste, :exalt_type, :aspect,
             :limit_trigger, :limit

  has_many :charms
  has_many :martial_arts_charms
  has_many :evocations
  has_many :spirit_charms
end
