require 'rails_helper'

RSpec.describe ChroniclePlayer, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:chronicle_player)).to be_valid
  end
end
