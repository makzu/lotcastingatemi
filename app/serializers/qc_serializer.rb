# frozen_string_literal: true

# app/serializers/qc_serializer.rb
class QcSerializer < PlayerAssetSerializer
  # rubocop:disable Layout/EmptyLinesAroundArguments
  attributes :name, :essence, :description, :portrait_link,
             :willpower_temporary, :willpower_permanent,
             :health_level_0s, :health_level_1s, :health_level_2s,
             :health_level_4s, :health_level_incap,
             :damage_bashing, :damage_lethal, :damage_aggravated,

             :motes_personal_current,   :motes_personal_total,
             :motes_peripheral_current, :motes_peripheral_total,
             :motes_committed,
             :anima_level, :anima_display, :aura, :excellency,
             :resources,

             :is_sorcerer, :shape_sorcery, :sorcerous_motes, :rituals,

             :movement, :appearance, :resolve, :guile, :evasion, :parry,
             :armor_name, :soak, :hardness, :join_battle,

             :actions, :senses, :grapple, :grapple_control,
             :feats_of_strength, :strength,

             :ties, :principles,
             :categories,
             :notes
  # rubocop:enable Layout/EmptyLinesAroundArguments

  has_many :qc_attacks
  has_many :qc_charms
  has_many :qc_merits
  has_many :spells
  has_many :poisons
end
