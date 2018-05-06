# frozen_string_literal: true

# app/serializers/merit_serializer.rb
class MeritSerializer < CharacterTraitSerializer
  attributes :label, :merit_name, :rating, :merit_cat,
             :description, :ref, :supernatural, :prereqs, :sort_order
end
