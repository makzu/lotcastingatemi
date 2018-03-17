# frozen_string_literal: true

# Common validations and relations for all Exalts
module Exalt
  extend ActiveSupport::Concern

  included do
    include MotePool

    has_many :evocations,          foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
    has_many :martial_arts_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
    has_many :spirit_charms,       foreign_key: 'character_id', inverse_of: :character, dependent: :destroy

    attribute :limit,         :integer, default: 0
    attribute :limit_trigger, :string,  default: ''

    validates :anima_level, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

    validates :motes_committed, json: { schema: Schemas::MOTE_COMMITTMENT }

    validates :resources, json: { schema: Schemas::RESOURCE }

    before_validation :set_max_available_motes

    def set_max_available_motes
      return unless will_save_change_to_attribute? :motes_committed

      self.motes_personal_current =   [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end

    private

    def motes_personal_available
      motes_personal_total - motes_committed.select { |x| x['pool'] == 'personal' }.sum { |x| x['motes'] }
    end

    def motes_peripheral_available
      motes_peripheral_total - motes_committed.select { |x| x['pool'] == 'peripheral' }.sum { |x| x['motes'] }
    end
  end
end
