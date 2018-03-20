# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'CustomAttributeCharms', type: :request do
  it_behaves_like 'character trait', :custom_attribute_charm, 'characters'
end
