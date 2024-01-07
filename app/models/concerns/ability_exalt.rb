# frozen_string_literal: true

# Common validations for Ability Exalts
module AbilityExalt
  extend ActiveSupport::Concern
  include Constants

  included do
    include Exalt

    alias_method :charms, :ability_charms

    normalizes :caste_abilities, :favored_abilities, with: method(:trim_array_attribute)

    before_validation :check_favored_abilities_on_caste_ability_change

    validates :caste_abilities, :favored_abilities, inclusion: { in: Constants::ABILITIES }
    validate :caste_and_favored_abilities_dont_overlap

    def check_favored_abilities_on_caste_ability_change
      return unless will_save_change_to_caste_abilities?

      self.favored_abilities = favored_abilities - caste_abilities
    end

    def caste_and_favored_abilities_dont_overlap
      return unless will_save_change_to_caste_abilities? || will_save_change_to_favored_abilities?
      return unless caste_abilities.intersect?(favored_abilities)

      errors.add(:caste_abilities, 'cannot have the same ability as both caste and favored')
      errors.add(:favored_abilities, 'cannot have the same ability as both caste and favored')
    end
  end
end
