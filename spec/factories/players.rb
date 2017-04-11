FactoryGirl.define do
  factory :player, aliases: [:st] do
    name "test player"
    sequence(:email, 100) { |n| "test#{n}@example.com" }
    password "password"
  end
end
