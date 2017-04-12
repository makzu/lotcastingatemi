# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QcAttack, type: :model do
  it 'has a valid factory' do
    expect(FactoryGirl.create(:qc_attack)).to be_valid
  end
end
