# frozen_string_literal: true

# Custom Attribute Exalts, for more flexibility than is allowed to Solars
class CustomAttributeCharacter < Character
  include AttributeExalt

  attribute :exalt_type, :string, default: 'Attribute Exalt'

  def custom_exalt?
    true
  end
end
