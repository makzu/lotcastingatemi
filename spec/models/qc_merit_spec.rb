require 'rails_helper'

RSpec.describe QcMerit, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:qc_merit)).to be_valid
  end
end
