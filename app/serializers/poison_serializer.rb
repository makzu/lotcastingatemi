# frozen_string_literal: true

# app/serializers/poison_serializer.rb
class PoisonSerializer < BaseSerializer
  attributes :name, :penalty, :interval, :damage, :damage_type,
             :crash_damage_type, :vector, :duration, :duration_type, :notes,
             :sorting, :ref
end
