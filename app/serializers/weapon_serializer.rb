# frozen_string_literal: true

# app/serializers/weapon_serializer.rb
class WeaponSerializer < CharacterTraitSerializer
  attributes :name, :weight, :tags, :is_artifact, :notes,
             :ability, :attr, :damage_attr,
             :bonus_accuracy, :bonus_damage, :bonus_defense, :bonus_overwhelming

  has_many :poisons
end
