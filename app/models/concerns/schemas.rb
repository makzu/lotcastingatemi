# frozen_string_literal: true

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
        "rating": { "type": 'integer', "minimum": 0, "maximum": 3 }
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
          "enum": %w[
            archery athletics awareness brawl bureaucracy craft
            dodge integrity investigation larceny linguistics
            lore martial arts medicine melee occult performance
            presence resistance ride sail socialize stealth
            survival thrown war
          ]
        },
        "context": { "type": 'string' }
      },
      "additionalProperties": false
    }
  }.freeze

  QC_ACTION = {
    "type": 'array',
    "items": {
      "type": 'object',
      "required": %w[action pool],
      "properties": {
        "action": { "type": 'string' },
        "pool": { "type": 'integer', "minimum": 0, "maximum": 99 }
      },
      "additionalProperties": false
    }
  }.freeze
end
