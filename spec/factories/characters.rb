FactoryGirl.define do
  factory :character do
    name "King"
    chronicle
    player
  end

  factory :character_2, class: Character do
    name "Queen"
    chronicle
    player
  end
end