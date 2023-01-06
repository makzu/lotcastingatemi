# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChroniclePlayer do
  it 'has a valid factory' do
    expect(create(:chronicle_player)).to be_valid
  end
end
