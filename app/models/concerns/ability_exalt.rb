# frozen_string_literal: true

# Common validations for Ability Exalts
module AbilityExalt
  extend ActiveSupport::Concern
  include Constants

  included do
    include Exalt

    validate :caste_abilities_are_valid
    validate :favored_abilities_are_valid

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
  end
end
