# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QcMerit, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:qc_merit)).to be_valid
  end
end
