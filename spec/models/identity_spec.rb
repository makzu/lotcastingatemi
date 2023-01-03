# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Identity do
  it 'has a valid factory' do
    expect(create(:identity)).to be_valid
  end
end
