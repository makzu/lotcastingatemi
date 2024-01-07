# frozen_string_literal: true

# Common validations and relations for all Exalts
module Exalt
  extend ActiveSupport::Concern

  included do
    include MotePool

    attribute :willpower_temporary, :integer, default: 5
    attribute :willpower_permanent, :integer, default: 5
    attribute :limit,               :integer, default: 0
    attribute :limit_trigger,       :string,  default: ''

    normalizes :excellencies_for, with: method(:trim_array_attribute)

    validates :resources, json: { schema: Schemas::RESOURCE }
    validates :excellencies_for,
              inclusion: { in: Constants::ATTRIBUTES + Constants::ABILITIES + %w[* dragonblood solar lunar sidereal] }

    def caste_is_blank?
      caste.blank?
    end

    def remove_caste_and_favored_attributes
      self.caste_attributes = []
      self.favored_attributes = []
    end
  end
end
