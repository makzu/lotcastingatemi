# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BattlegroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :might, :drill, :perfect_morale,
             :magnitude, :magnitude_current,
             :essence, :willpower_temporary, :willpower_permanent, :armor_name,
             :soak, :hardness, :evasion, :parry, :resolve, :guile, :appearance,
             :movement, :senses, :join_battle, :initiative, :onslaught

  has_many :qc_attacks
end
