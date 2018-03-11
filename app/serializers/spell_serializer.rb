# frozen_string_literal: true

# app/serializers/spell_serializer.rb
class SpellSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :name, :cost, :duration, :circle,
             :keywords, :body, :ref
end
