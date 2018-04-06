# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BattlegroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :might, :drill, :perfect_morale, :type,
             :description,
             :magnitude, :health_levels,
             :essence, :willpower_temporary, :willpower_permanent, :armor_name,
             :soak, :hardness, :evasion, :parry, :resolve, :guile, :appearance,
             :movement, :senses, :join_battle, :initiative, :onslaught,
             :in_combat, :has_acted,
             :sort_order, :chronicle_sort_order, :public

  attribute :player_id
  attribute :chronicle_id

  has_many :qc_attacks

  attribute :pinned, if: :owner?
  attribute :hidden, if: :owner_or_st?

  def owner?
    object.player == current_player
  end

  def owner_or_st?
    owner? || (object.chronicle && object.storyteller == current_player)
  end
end
