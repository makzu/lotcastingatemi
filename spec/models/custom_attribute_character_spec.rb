# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAttributeCharacter do
  include_examples 'convertable_character', :custom_attribute_character
end
