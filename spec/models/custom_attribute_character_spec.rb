# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAttributeCharacter do
  it_behaves_like 'convertable_character', :custom_attribute_character
end
