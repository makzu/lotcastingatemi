# frozen_string_literal: true

# Serializer for IDs only
class IdOnlySerializer < ActiveModel::Serializer
  attributes :id
end
