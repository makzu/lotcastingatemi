FactoryGirl.define do
  factory :player do
    name "Scooby"
    sequence(:email)	{ |n| "test_user#{n}@email.com" }
    password "password"
    confirmed_at Time.now
  end
end