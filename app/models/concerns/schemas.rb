# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength

# Validation schemas for the various json columns on characters and QCs.
module Schemas
  CRAFT = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[ craft rating ],
      'properties' => {
        'craft' => { 'type' => 'string' },
        'rating' => { 'type' => 'integer', 'minimum' => 0, 'maximum' => 5 }
      },
      'additionalProperties' => false
    }
  }.freeze
  CRAFT_PARAMS = %w[ craft rating ].freeze

  MARTIAL_ARTS = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[ style rating ],
      'properties' => {
        'style' => { 'type' => 'string' },
        'rating' => { 'type' => 'integer', 'minimum' => 0, 'maximum' => 5 }
      },
      'additionalProperties' => false
    }
  }.freeze
  MARTIAL_ARTS_PARAMS = %w[ style rating ].freeze

  INTIMACY = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[subject rating],
      'properties' => {
        'subject' => { 'type' => 'string' },
        'rating' => { 'type' => 'integer', 'minimum' => 0, 'maximum' => 3 },
        'hidden' => { 'type' => 'boolean' }
      },
      'additionalProperties' => false
    }
  }.freeze
  INTIMACY_PARAMS = %w[ subject rating hidden ].freeze

  MOTE_COMMITTMENT = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[pool label motes],
      'properties' => {
        'pool' => { 'type' => 'string', 'enum' => %w[personal peripheral] },
        'label' => { 'type' => 'string' },
        'motes' => { 'type' => 'integer', 'minimum' => 0 },
        'scenelong' => { 'type' => 'boolean' }
      },
      'additionalProperties' => false
    }
  }.freeze
  MOTE_COMMITTMENT_PARAMS = %w[ pool label motes scenelong ].freeze

  RESOURCE = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[resource value],
      'properties' => {
        'resource' => { 'type' => 'string' },
        'value' => { 'type' => 'integer', 'minimum' => 0 }
      },
      'additionalProperties' => false
    }
  }.freeze
  RESOURCE_PARAMS = %w[ resource value ].freeze

  # rubocop:disable Lint/EmptyInterpolation
  SPECIALTY = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[ ability context ],
      'properties' => {
        'ability' => {
          'type' => 'string',
          'enum' => %W[
            archery athletics awareness brawl bureaucracy craft dodge integrity
            investigation larceny linguistics lore martial_arts medicine melee
            occult performance presence resistance ride sail socialize stealth
            survival thrown war #{''}
          ]
        },
        'context' => { 'type' => 'string' }
      },
      'additionalProperties' => false
    }
  }.freeze
  # rubocop:enable Lint/EmptyInterpolation
  SPECIALTY_PARAMS = %i[ ability context ].freeze

  FORM = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[form],
      'properties' => {
        'form' => { 'type' => 'string' },
        'qc_id' => { 'type' => 'integer' }
      }
    }
  }.freeze
  FORM_PARAMS = %w[ form qc_id ].freeze

  XP_LOG = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[label points],
      'properties' => {
        'label' => { 'type' => 'string' },
        'points' => { 'type' => 'integer' }
      }
    }
  }.freeze
  XP_LOG_PARAMS = %w[ label points ].freeze

  QC_ACTION = {
    'type' => 'array',
    'items' => {
      'type' => 'object',
      'required' => %w[action pool],
      'properties' => {
        'action' => { 'type' => 'string' },
        'pool' => { 'type' => 'integer', 'minimum' => 0 }
      },
      'additionalProperties' => false
    }
  }.freeze
  QC_ACTION_PARAMS = %w[ action pool ].freeze

  WEAPON_OVERRIDES = {
    'type' => 'object',
    'properties' => {
      'attack_attribute' => {
        'type' => 'object',
        'required' => %w[use],
        'properties' => {
          'use' => { 'type' => 'string' },
          'base_only' => { 'type' => 'boolean' }
        },
        'additionalProperties' => false
      },
      'defense_attribute' => {
        'type' => 'object',
        'required' => %w[use],
        'properties' => {
          'use' => { 'type' => 'string' },
          'base_only' => { 'type' => 'boolean' }
        },
        'additionalProperties' => false
      },
      'damage_attribute' => {
        'type' => 'object',
        'required' => %w[use],
        'properties' => {
          'use' => { 'type' => 'string' },
          'base_only' => { 'type' => 'boolean' }
        },
        'additionalProperties' => false
      },
      'additionalProperties' => false
    }
  }.freeze
end
# rubocop:enable Metrics/ModuleLength
