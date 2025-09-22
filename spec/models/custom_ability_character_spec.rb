# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAbilityCharacter do
  it_behaves_like 'convertable_character', :custom_ability_character
end
