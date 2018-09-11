# frozen_string_literal: true

require 'rails_helper'
# Copied from https://robots.thoughtbot.com/testing-your-factories-first
# rubocop:disable RSpec/DescribeClass
RSpec.describe 'Factories' do
  FactoryBot.factories.map(&:name).each do |factory_name|
    describe "The #{factory_name} factory" do
      it 'is valid' do
        expect(build(factory_name)).to be_valid
      end
    end
  end
end
# rubocop:enable RSpec/DescribeClass
