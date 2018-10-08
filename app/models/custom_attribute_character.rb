# frozen_string_literal: true

# Custom Attribute Exalts, for more flexibility than is allowed to Solars
class CustomAttributeCharacter < Character
  include AttributeExalt
  include CustomExalt

  attribute :exalt_type, :string, default: 'Attribute Exalt'
end
