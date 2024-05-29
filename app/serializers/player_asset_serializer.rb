# frozen_string_literal: true

# app/serializers/attribute_charm_serializer.rb
class PlayerAssetSerializer < BaseSerializer
  attributes :player_id, :type, :sorting, :hidden, :pinned, :public,
             :editable, :deletable,
             :chronicle_id, :chronicle_sorting,
             :initiative, :onslaught, :in_combat, :has_acted

  def deletable
    object.player_id == current_player.id
  end

  def editable
    deletable || object.st_id == current_player.id
  end
end
