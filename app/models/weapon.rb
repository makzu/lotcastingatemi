# frozen_string_literal: true

class Weapon < ApplicationRecord
  belongs_to :character

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
end
