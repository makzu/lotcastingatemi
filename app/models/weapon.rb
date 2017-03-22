class Weapon < ApplicationRecord
  belongs_to :character

  validates :weight, inclusion: { in: %w{light medium heavy} }
end
