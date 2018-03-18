# frozen_string_literal: true

FactoryBot.define do
  factory :custom_attribute_charm, parent: :charm, class: CustomAttributeCharm do
    type 'CustomAttributeCharm'
  end
end
