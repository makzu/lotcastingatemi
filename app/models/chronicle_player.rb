# frozen_string_literal: true

# Simple join model for Chronicles and Players.
class ChroniclePlayer < ApplicationRecord
  belongs_to :chronicle
  belongs_to :player
end
