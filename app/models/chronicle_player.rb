# frozen_string_literal: true

class ChroniclePlayer < ApplicationRecord
  belongs_to :chronicle
  belongs_to :player
end
