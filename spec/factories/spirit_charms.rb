# frozen_string_literal: true

FactoryBot.define do
  factory :spirit_charm, parent: :charm, class: SpiritCharm do
    type 'SpiritCharm'
    keywords ['eclipse']
  end
end
