# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BattlegroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :might, :drill, :perfect_morale,
             :description,
             :magnitude, :magnitude_current,
             :essence, :willpower_temporary, :willpower_permanent, :armor_name,
             :soak, :hardness, :evasion, :parry, :resolve, :guile, :appearance,
             :movement, :senses, :join_battle, :initiative, :onslaught

  attribute :player_id
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
