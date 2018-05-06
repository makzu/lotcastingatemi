# frozen_string_literal: true

# app/serializers/qc_merit_serializer.rb
class QcMeritSerializer < BaseSerializer
  attributes :name, :qc_id, :latent, :magical, :body, :ref, :sort_order
end
