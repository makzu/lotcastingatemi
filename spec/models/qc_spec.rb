require 'rails_helper'

RSpec.describe Qc, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:qc)).to be_valid
  end
end
