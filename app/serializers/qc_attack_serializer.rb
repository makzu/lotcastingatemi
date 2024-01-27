# frozen_string_literal: true

# app/serializers/qc_attack_serializer.rb
class QcAttackSerializer < BaseSerializer
  attributes :name, :pool, :range, :damage, :overwhelming, :tags,
             :qc_attackable_id, :qc_attackable_type, :sorting

  # has_many :poisons
end
