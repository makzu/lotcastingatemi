# frozen_string_literal: true

# app/serializers/spell_serializer.rb
class SpellSerializer < BaseSerializer
  attributes :name, :cost, :duration, :circle, :control,
             :keywords, :body, :ref, :categories,
             :sorting
end
