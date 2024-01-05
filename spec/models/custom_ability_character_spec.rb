# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAbilityCharacter do
  include_examples 'convertable_character', :custom_ability_character
end
