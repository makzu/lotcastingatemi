# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Qc do
  it 'has a valid factory' do
    expect(create(:qc)).to be_valid
  end
end
