# frozen_string_literal: true

# app/serializers/qc_charm_serializer.rb
class QcCharmSerializer < BaseSerializer
  attributes :name, :qc_id, :cost, :timing, :duration, :keywords,
             :min_essence, :body, :ref, :category, :sort_order
end
