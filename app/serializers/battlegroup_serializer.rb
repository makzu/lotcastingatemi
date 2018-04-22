# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BattlegroupSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :chronicle_id,
             :hidden, :pinned, :sort_order, :chronicle_sort_order, :public,
             :name, :size, :might, :drill, :perfect_morale, :type,
             :description,
             :magnitude, :health_levels,
             :essence, :willpower_temporary, :willpower_permanent, :armor_name,
             :soak, :hardness, :evasion, :parry, :resolve, :guile, :appearance,
             :movement, :senses, :join_battle, :initiative, :onslaught,
             :in_combat, :has_acted

  has_many :qc_attacks
end
