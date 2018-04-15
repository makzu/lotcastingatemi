# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Charms::AttributeCharms', type: :request do
  it_behaves_like 'character trait', :charms_attribute_charm, 'characters'
end
