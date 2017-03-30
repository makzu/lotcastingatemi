require 'rails_helper'

RSpec.describe Player, type: :model do

	it "has a valid factory" do
		expect(FactoryGirl.create(:player)).to be_valid
	end
end