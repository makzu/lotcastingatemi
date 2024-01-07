# frozen_string_literal: true

# Common validations for Attribute Exalts
module AttributeExalt
  extend ActiveSupport::Concern
  include Constants

  included do
    include Exalt

    alias_method :charms, :attribute_charms

    before_validation :ensure_uniqueness_of_caste_and_favored_attributes
    before_validation :check_favored_attributes_on_caste_attribute_change

    validate :caste_attributes_are_valid
    validate :favored_attributes_are_valid
    validate :caste_and_favored_attributes_dont_overlap

    def ensure_uniqueness_of_caste_and_favored_attributes
      self.caste_attributes   = caste_attributes.uniq
      self.favored_attributes = favored_attributes.uniq
    end

    def check_favored_attributes_on_caste_attribute_change
      return unless will_save_change_to_attribute? :caste_attributes

      self.favored_attributes = favored_attributes - caste_attributes
    end

    def caste_attributes_are_valid
      caste_attributes.each do |a|
        errors.add(:caste_attributes, "#{a} is not a valid attribute") unless Constants::ATTRIBUTES.include? a
      end
    end

    def favored_attributes_are_valid
      favored_attributes.each do |a|
        errors.add(:favored_attributes, "#{a} is not a valid attribute") unless Constants::ATTRIBUTES.include? a
      end
    end

    def caste_and_favored_attributes_dont_overlap
      return unless caste_attributes.intersect?(favored_attributes)

      errors.add(:caste_attributes, 'cannot have the same attribute as both caste and favored')
      errors.add(:favored_attributes, 'cannot have the same attribute as both caste and favored')
    end
  end
end
