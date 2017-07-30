# frozen_string_literal: true

# Traits and Validations specific to Solars.
class SolarCharacter < Character
  include MotePool

  has_many :evocations,          as: :character, dependent: :destroy
  has_many :martial_arts_charms, as: :character, dependent: :destroy
  has_many :solar_charms,        as: :character, dependent: :destroy

  SOLAR_CASTES = %w[ dawn zenith twilight night eclipse ].freeze
  CASTE_ABILITIES = {
    "dawn":     %w[ archery awareness brawl dodge melee resistance thrown war ],
    "zenith":   %w[ athletics integrity performance lore presence resistance survival war ],
    "twilight": %w[ bureaucracy craft integrity investigation linguistics lore medicine occult ],
    "night":    %w[ athletics awareness dodge investigation larceny ride stealth socialize ],
    "eclipse":  %w[ bureaucracy larceny linguistics occult presence ride sail socialize ]
  }.freeze

  validates :caste, inclusion: { in: SOLAR_CASTES }, unless: :abils_are_blank?
  validate :caste_abilities_are_valid,               unless: :abils_are_blank?
  validate :caste_and_favored_dont_overlap,          unless: :abils_are_blank?
  validate :favored_abilities_are_valid,             unless: :abils_are_blank?
  validate :five_caste_and_five_favored_abilities,   unless: :abils_are_blank?
  validate :supernal_ability_is_caste,               unless: :abils_are_blank?

  validates :limit, numericality: {
    greater_than_or_equal_to: 0, less_than_or_equal_to: 10
  }

  after_initialize :set_defaults

  private

  def set_defaults
    self.limit ||= 0
    self.limit_trigger ||= ''
  end

  def abils_are_blank?
    caste.blank? || caste_abilities.length < 5 || favored_abilities.length < 5
  end

  def caste_and_favored_dont_overlap
    unless (caste_abilities & favored_abilities).empty? # rubocop:disable Style/GuardClause
      errors.add(:caste_abilities, 'cannot have the same ability as both caste and favored')
      errors.add(:favored_abilities, 'cannot have the same ability as both caste and favored')
    end
  end

  def caste_abilities_are_valid
    caste_abilities.each do |a|
      unless CASTE_ABILITIES[caste.to_sym].include? a
        errors.add(:caste_abilities, "#{a} is not a valid caste ability for #{caste}s")
      end
    end
  end

  def favored_abilities_are_valid
    favored_abilities.each do |a|
      unless ABILITIES.include? a
        errors.add(:favored_abilities, "#{a} is not a valid ability")
      end
    end
  end

  def supernal_ability_is_caste
    unless CASTE_ABILITIES[caste.to_sym].include? supernal_ability # rubocop:disable Style/GuardClause
      errors.add(:supernal_ability, "not a valid supernal ability for #{caste}s")
    end
  end

  def five_caste_and_five_favored_abilities
    unless caste_abilities.length == 5
      errors.add(:caste_abilities, 'Must have exactly 5 caste abilities')
    end
    unless favored_abilities.length == 5 # rubocop:disable Style/GuardClause
      errors.add(:favored_abilities, 'Must have exactly 5 favored abilities')
    end
  end
end
