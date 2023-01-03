# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QcAttack do
  it 'has a valid factory' do
    expect(create(:qc_attack)).to be_valid
    expect(create(:battlegroup_qc_attack)).to be_valid
  end
end
