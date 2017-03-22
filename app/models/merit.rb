class Merit < ApplicationRecord
  belongs_to :character

  validates :merit_cat, inclusion: { in: %w{ story innate purchased } }

  validates :rating, one_thru_five_stat: true
end
