FactoryGirl.define do
  factory :merit do
    character
    rating 3
    name "Merit"
    merit_cat "story"
  end

  factory :invalid_merit, class: Merit do
    character
    rating 
    name 
    merit_cat
  end
end