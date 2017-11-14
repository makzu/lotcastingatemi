# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QcCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:qc_charm)).to be_valid
  end
end
