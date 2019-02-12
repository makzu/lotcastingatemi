# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength, Layout/AlignHash
# Validation schemas for the various json columns on characters and QCs.
module Schemas
  CRAFT = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[ craft rating ],
      "properties": {
        "craft": { "type": 'string' },
        "rating": { "type": 'integer', "minimum": 0, "maximum": 5 }
      },
      "additionalProperties": false
    }
  }.freeze
  CRAFT_PARAMS = %i[ craft rating ].freeze

  MARTIAL_ARTS = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[ style rating ],
      "properties": {
        "style": { "type": 'string' },
        "rating": { "type": 'integer', "minimum": 0, "maximum": 5 }
      },
      "additionalProperties": false
    }
  }.freeze
  MARTIAL_ARTS_PARAMS = %i[ style rating ].freeze

  INTIMACY = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[subject rating],
      "properties": {
        "subject": { "type": 'string' },
        "rating": { "type": 'integer', "minimum": 0, "maximum": 3 },
        "hidden": { "type": 'boolean' }
      },
      "additionalProperties": false
    }
  }.freeze
  INTIMACY_PARAMS = %i[ subject rating hidden ].freeze

  MOTE_COMMITTMENT = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[pool label motes],
      "properties": {
        "pool": { "type": 'string', "enum": %w[personal peripheral] },
        "label": { "type": 'string' },
        "motes": { "type": 'integer', "minimum": 0 },
        "scenelong": { "type": 'boolean' }
      },
      "additionalProperties": false
    }
  }.freeze
  MOTE_COMMITTMENT_PARAMS = %i[ pool label motes scenelong ].freeze

  RESOURCE = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[resource value],
      "properties": {
        "resource": { "type": 'string' },
        "value": { "type": 'integer', "minimum": 0 }
      },
      "additionalProperties": false
    }
  }.freeze
  RESOURCE_PARAMS = %i[ resource value ].freeze

  SPECIALTY = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[ ability context ],
      "properties": {
        "ability": {
          "type": 'string',
          # rubocop:disable Lint/LiteralInInterpolation
          "enum": %W[
            archery athletics awareness brawl bureaucracy craft dodge integrity
            investigation larceny linguistics lore martial_arts medicine melee
            occult performance presence resistance ride sail socialize stealth
            survival thrown war #{''}
          ]
          # rubocop:enable Lint/LiteralInInterpolation
        },
        "context": { "type": 'string' }
      },
      "additionalProperties": false
    }
  }.freeze
  SPECIALTY_PARAMS = %i[ ability context ].freeze

  XP_LOG = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[label points],
      "properties": {
        "label": { "type": 'string' },
        "points": { "type": 'integer' }
      }
    }
  }.freeze
  XP_LOG_PARAMS = %i[ label points ].freeze

  QC_ACTION = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[action pool],
      "properties": {
        "action": { "type": 'string' },
        "pool":   { "type": 'integer', "minimum": 0 }
      },
      "additionalProperties": false
    }
  }.freeze
  QC_ACTION_PARAMS = %i[ action pool ].freeze
end
# rubocop:enable Metrics/ModuleLength, Layout/AlignHash
