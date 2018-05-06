# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BaseSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at
end
