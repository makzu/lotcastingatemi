# frozen_string_literal: true

# Common validations for Ability Exalts
module AbilityExalt
  extend ActiveSupport::Concern
  include Constants

  included do
    include Exalt

    validate :caste_abilities_are_valid
    validate :favored_abilities_are_valid
    validate :caste_and_favored_abilities_dont_overlap

    before_validation :ensure_uniqueness_of_caste_and_favored_abilities

    def caste_abilities_are_valid
      caste_abilities.each do |a|
        errors.add(:caste_abilities, "#{a} is not a valid ability") unless Constants::ABILITIES.include? a
      end
    end

    def favored_abilities_are_valid
      favored_abilities.each do |a|
        errors.add(:favored_abilities, "#{a} is not a valid ability") unless Constants::ABILITIES.include? a
      end
    end

    def caste_and_favored_abilities_dont_overlap
      unless (caste_abilities & favored_abilities).empty? # rubocop:disable Style/GuardClause
        errors.add(:caste_abilities, 'cannot have the same ability as both caste and favored')
        errors.add(:favored_abilities, 'cannot have the same ability as both caste and favored')
      end
    end

    def ensure_uniqueness_of_caste_and_favored_abilities
      self.caste_abilities   = caste_abilities.uniq
      self.favored_abilities = favored_abilities.uniq
    end
  end
end
