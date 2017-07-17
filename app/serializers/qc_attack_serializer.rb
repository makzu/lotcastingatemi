# frozen_string_literal: true

# app/serializers/qc_attack_serializer.rb
class QcAttackSerializer < ActiveModel::Serializer
  attributes :id, :qc_id, :name, :pool, :range, :damage, :overwhelming, :tags
end
