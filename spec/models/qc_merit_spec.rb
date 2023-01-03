# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QcMerit do
  it 'has a valid factory' do
    expect(create(:qc_merit)).to be_valid
  end
end
