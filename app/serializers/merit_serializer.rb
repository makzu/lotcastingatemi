# frozen_string_literal: true

# app/serializers/merit_serializer.rb
class MeritSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :rating, :name, :merit_name, :merit_cat,
             :description, :ref, :supernatural, :prereqs
end
