# frozen_string_literal: true

# app/serializers/attribute_charm_serializer.rb
class PlayerAssetSerializer < BaseSerializer
  attributes :player_id, :type, :sorting, :hidden, :pinned, :public,
             :chronicle_id, :chronicle_sorting,
             :initiative, :onslaught, :in_combat, :has_acted
end
