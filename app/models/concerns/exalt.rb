# frozen_string_literal: true

# Common validations and relations for all Exalts
module Exalt
  extend ActiveSupport::Concern

  included do
    include MotePool

    before_validation :trim_array_attributes

    attribute :willpower_temporary, :integer, default: 5
    attribute :willpower_permanent, :integer, default: 5
    attribute :limit,               :integer, default: 0
    attribute :limit_trigger,       :string,  default: ''

    validates :resources, json: { schema: Schemas::RESOURCE }
    validate :excellencies_for_is_valid

    def excellencies_for_is_valid
      return if excellencies_for.blank?

      attr_abil = Constants::ATTRIBUTES + Constants::ABILITIES + %w[* dragonblood solar lunar sidereal]
      excellencies_for.each do |e|
        errors.add(:excellencies_for, "#{e} is not a valid excellency target") unless attr_abil.include? e
      end
    end

    def trim_array_attributes
      %i[excellencies_for caste_abilities favored_abilities caste_attributes
         favored_attributes].each do |array_attribute|
        if will_save_change_to_attribute?(array_attribute)
          self[array_attribute] =
            self[array_attribute].compact_blank.collect(&:strip)
        end
      end
    end

    def caste_is_blank?
      caste.blank?
    end

    def remove_caste_and_favored_attributes
      self.caste_attributes = []
      self.favored_attributes = []
    end
  end
end
