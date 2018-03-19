# frozen_string_literal: true

# Traits and Validations specific to Solars.
class SolarCharacter < Character
  include AbilityExalt

  attribute :motes_personal_total,     :integer, default: 13
  attribute :motes_personal_current,   :integer, default: 13
  attribute :motes_peripheral_total,   :integer, default: 33
  attribute :motes_peripheral_current, :integer, default: 33
  attribute :exalt_type,               :string,  default: 'Solar'

  has_many :solar_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :solar_charms

  SOLAR_CASTES = %w[ dawn zenith twilight night eclipse ].freeze
  CASTE_ABILITIES = {
    "dawn":     %w[ archery awareness brawl dodge melee resistance thrown war ],
    "zenith":   %w[ athletics integrity performance lore presence resistance survival war ],
    "twilight": %w[ bureaucracy craft integrity investigation linguistics lore medicine occult ],
    "night":    %w[ athletics awareness dodge investigation larceny ride stealth socialize ],
    "eclipse":  %w[ bureaucracy larceny linguistics occult presence ride sail socialize ]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_exalt_type
  before_validation :set_caste_ability

  # TODO: re-enable these validations once they can be refactored to not throw
  #  errors on new, empty SolarCharacters
  validates :caste, inclusion: { in: SOLAR_CASTES }, unless: :caste_is_blank?
  validate :caste_abilities_are_valid_solar,         unless: :caste_is_blank?
  validate :caste_and_favored_dont_overlap,          unless: :caste_is_blank?
  validate :supernal_ability_is_caste,               unless: :caste_is_blank?
  validate :five_caste_and_five_favored_abilities

  validates :limit, numericality: {
    greater_than_or_equal_to: 0, less_than_or_equal_to: 10
  }

  private

  def caste_is_blank?
    caste.blank?
  end

  def set_mote_pool_totals
    return unless will_save_change_to_attribute? :essence

    self.motes_personal_total     = (essence * 3) + 10
    self.motes_peripheral_total   = (essence * 7) + 26
    self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
    self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
  end

  def set_exalt_type
    self.exalt_type = 'Solar'
  end

  def set_caste_ability
    return unless will_save_change_to_attribute?(:supernal_ability) &&
                  caste_abilities.length < 5

    self.caste_abilities += [supernal_ability]
  end

  def caste_and_favored_dont_overlap
    unless (caste_abilities & favored_abilities).empty? # rubocop:disable Style/GuardClause
      errors.add(:caste_abilities, 'cannot have the same ability as both caste and favored')
      errors.add(:favored_abilities, 'cannot have the same ability as both caste and favored')
    end
  end

  # rubocop:disable Style/IfUnlessModifier
  def caste_abilities_are_valid_solar
    caste_abilities.each do |a|
      unless CASTE_ABILITIES[caste.to_sym].include? a
        errors.add(:caste_abilities, "#{a} is not a valid caste ability for #{caste}s")
      end
    end
  end

  def supernal_ability_is_caste
    return if supernal_ability.blank?
    unless caste_abilities.include? supernal_ability # rubocop:disable Style/GuardClause
      errors.add(:supernal_ability, "not a valid supernal ability for #{caste}s")
    end
  end

  def five_caste_and_five_favored_abilities
    unless caste_abilities.length <= 5
      errors.add(:caste_abilities, 'Must have at most 5 caste abilities')
    end
    unless favored_abilities.length <= 5 # rubocop:disable Style/GuardClause
      errors.add(:favored_abilities, 'Must have at most 5 favored abilities')
    end
  end
  # rubocop:enable Style/IfUnlessModifier
end
