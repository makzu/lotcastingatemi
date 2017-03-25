## Common validations for entities with intimacies
INTIMACY_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["subject", "rating"],
    "properties": {
      "subject": { "type": "string" },
      "rating": { "type": "integer", "minimum": 0, "maximum": 3 }
    },
    "additionalProperties": false
  }
}

module Intimacies
  extend ActiveSupport::Concern

  included do
    validates :principles,          json: { schema: INTIMACY_SCHEMA     }
    validates :ties,                json: { schema: INTIMACY_SCHEMA     }
  end
end
