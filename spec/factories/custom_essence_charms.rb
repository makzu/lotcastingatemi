# frozen_string_literal: true

FactoryBot.define do
  factory :custom_essence_charm, parent: :charm, class: CustomEssenceCharm do
    type 'CustomEssenceCharm'
  end
end
