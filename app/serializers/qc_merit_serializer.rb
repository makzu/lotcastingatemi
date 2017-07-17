# frozen_string_literal: true

# app/serializers/qc_merit_serializer.rb
class QcMeritSerializer < ActiveModel::Serializer
  attributes :id, :qc_id, :name, :latent, :magical, :body, :ref
end
