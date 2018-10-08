# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BattlegroupSerializer < PlayerAssetSerializer
  attributes :name, :size, :might, :drill, :perfect_morale,
             :description, :portrait_link,
             :magnitude, :health_levels,
             :essence, :willpower_temporary, :willpower_permanent, :armor_name,
             :soak, :hardness, :evasion, :parry, :resolve, :guile, :appearance,
             :movement, :senses, :join_battle

  has_many :qc_attacks
end
