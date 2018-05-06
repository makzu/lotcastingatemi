# frozen_string_literal: true

# app/serializers/attribute_charm_serializer.rb
class PlayerAssetSerializer < BaseSerializer
  attributes :player_id, :type, :sort_order, :hidden, :pinned, :public,
             :chronicle_id, :chronicle_sort_order,
             :initiative, :onslaught, :in_combat, :has_acted
end
