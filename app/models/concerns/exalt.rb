# frozen_string_literal: true

# Common validations and relations for all Exalts
module Exalt
  extend ActiveSupport::Concern

  included do
    include MotePool

    has_many :evocations,          foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
    has_many :martial_arts_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
    has_many :spirit_charms,       foreign_key: 'character_id', inverse_of: :character, dependent: :destroy

    attribute :willpower_temporary, :integer, default: 5
    attribute :willpower_permanent, :integer, default: 5
    attribute :limit,               :integer, default: 0
    attribute :limit_trigger,       :string,  default: ''

    validates :anima_level, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

    validates :motes_committed, json: { schema: Schemas::MOTE_COMMITTMENT }
    validates :resources,       json: { schema: Schemas::RESOURCE }
    validate :excellencies_for_is_valid

    before_validation :set_max_available_motes
    before_validation :trim_array_attributes

    def excellencies_for_is_valid
      return if excellencies_for.blank?
      attr_abil = Constants::ATTRIBUTES + Constants::ABILITIES + ['*']
      excellencies_for.each do |e|
        errors.add(:excellencies_for, "#{e} is not a valid excellency target") unless attr_abil.include? e
      end
    end

    def set_max_available_motes
      return unless will_save_change_to_attribute?(:motes_committed) ||
                    will_save_change_to_attribute?(:motes_personal_total) ||
                    will_save_change_to_attribute?(:motes_peripheral_total)

      self.motes_personal_current =   [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end

    def trim_array_attributes # rubocop:disable-line Metrics/AbcSize
      return unless will_save_change_to_attribute?(:excellencies_for) ||
                    will_save_change_to_attribute?(:caste_abilities) ||
                    will_save_change_to_attribute?(:favored_abilities) ||
                    will_save_change_to_attribute?(:caste_attributes) ||
                    will_save_change_to_attribute?(:favored_attributes)

      self.excellencies_for = excellencies_for.reject(&:blank?).collect(&:strip)
      self.caste_abilities = caste_abilities.reject(&:blank?).collect(&:strip)
      self.favored_abilities = favored_abilities.reject(&:blank?).collect(&:strip)
      self.caste_attributes = caste_attributes.reject(&:blank?).collect(&:strip)
      self.favored_attributes = favored_attributes.reject(&:blank?).collect(&:strip)
    end

    def motes_personal_available
      motes_personal_total - motes_committed.select { |x| x['pool'] == 'personal' }.sum { |x| x['motes'] }
    end

    def motes_peripheral_available
      motes_peripheral_total - motes_committed.select { |x| x['pool'] == 'peripheral' }.sum { |x| x['motes'] }
    end

    def caste_is_blank?
      caste.blank?
    end
  end
end
