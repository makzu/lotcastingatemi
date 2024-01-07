# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Character do
  include_examples 'convertable_character', :character

  it_behaves_like 'Intimacies'
end
