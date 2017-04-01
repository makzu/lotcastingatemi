FactoryGirl.define do
  factory :chronicle do
    name "Chronicle"
    association :st, factory: :player
  end
end
