# frozen_string_literal: true

class SolarCharm < Charm
  validates :ability, inclusion: { in: ABILITIES }
end
