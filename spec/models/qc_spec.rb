# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Qc, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:qc)).to be_valid
  end
end
