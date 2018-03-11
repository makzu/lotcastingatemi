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
  end
end
