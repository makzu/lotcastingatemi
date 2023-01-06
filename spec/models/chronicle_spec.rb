# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Chronicle do
  it 'has a valid factory' do
    expect(create(:chronicle)).to be_valid
  end
end
