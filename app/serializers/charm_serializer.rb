# frozen_string_literal: true

# app/serializers/charm_serializer.rb
class CharmSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :type, :name, :cost, :timing, :duration,
             :keywords, :min_essence, :body, :ref
end
