# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
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

  QC_ACTION = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[action pool],
      "properties": {
        "action": { "type": 'string' },
        "pool": { "type": 'integer', "minimum": 0 }
      },
      "additionalProperties": false
    }
  }.freeze
end
# rubocop:enable Metrics/ModuleLength
