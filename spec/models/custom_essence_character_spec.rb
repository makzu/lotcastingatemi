# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomEssenceCharacter do
  it_behaves_like 'convertable_character', :custom_essence_character
end
