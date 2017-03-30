require 'rails_helper'

RSpec.describe Chronicle, type: :model do
  it "has a valid factory" do
  	expect(FactoryGirl.create(:chronicle)).to be_valid
  end
end
