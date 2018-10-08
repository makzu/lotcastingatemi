# frozen_string_literal: true

# Validations and methods common to Custom Exalts, all 3 types
module CustomExalt
  extend ActiveSupport::Concern

  included do
    attribute :motes_personal_total,     :integer, default: 10
    attribute :motes_personal_current,   :integer, default: 10
    attribute :motes_peripheral_total,   :integer, default: 10
    attribute :motes_peripheral_current, :integer, default: 10

    def custom_exalt?
      true
    end
  end
end
