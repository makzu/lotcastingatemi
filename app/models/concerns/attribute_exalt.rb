# frozen_string_literal: true

# Common validations for Attribute Exalts
module AttributeExalt
  extend ActiveSupport::Concern
  include Constants

  included do
    include Exalt

    alias_method :charms, :attribute_charms

    normalizes :caste_attributes, :favored_attributes, with: method(:trim_array_attribute)

    before_validation :check_favored_attributes_on_caste_attribute_change

    validates :caste_attributes, :favored_attributes, inclusion: { in: Constants::ATTRIBUTES }
    validate :caste_and_favored_attributes_dont_overlap

    def check_favored_attributes_on_caste_attribute_change
      return unless will_save_change_to_caste_attributes?

      self.favored_attributes = favored_attributes - caste_attributes
    end

    def caste_and_favored_attributes_dont_overlap
      return unless will_save_change_to_caste_attributes? || will_save_change_to_favored_attributes?
      return unless caste_attributes.intersect?(favored_attributes)

      errors.add(:caste_attributes, 'cannot have the same attribute as both caste and favored')
      errors.add(:favored_attributes, 'cannot have the same attribute as both caste and favored')
    end
  end
end
