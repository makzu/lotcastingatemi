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
        unless attr_abil.include? e
          errors.add(:excellencies_for, "#{e} is not a valid excellency target")
        end
      end
    end

    def trim_array_attributes
      return unless will_save_change_to_attribute?(:excellencies_for) ||
                    will_save_change_to_attribute?(:caste_abilities) ||
                    will_save_change_to_attribute?(:favored_abilities) ||
                    will_save_change_to_attribute?(:caste_attributes) ||
                    will_save_change_to_attribute?(:favored_attributes)

      self.excellencies_for = excellencies_for.compact_blank.collect(&:strip)
      self.caste_abilities = caste_abilities.compact_blank.collect(&:strip)
      self.favored_abilities = favored_abilities.compact_blank.collect(&:strip)
      self.caste_attributes = caste_attributes.compact_blank.collect(&:strip)
      self.favored_attributes = favored_attributes.compact_blank.collect(&:strip)
    end

    def caste_is_blank?
      caste.blank?
    end
  end
end
