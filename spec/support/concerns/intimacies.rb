# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples_for 'Intimacies' do
  let(:intimacies) { [{ 'subject' => 'a', 'rating' => 1, 'hidden' => true }, { 'subject' => 'b', 'rating' => 1, 'hidden' => false }] }
  let(:model) { create(described_class.name.underscore, ties: intimacies, principles: intimacies) }

  describe '#without_secrets' do
    it 'does not modify the original object' do
      result = model.without_secrets # rubocop:disable Lint/UselessAssignment

      # Assert that the original object is not modified
      expect(model.ties.length).to eq(2)
      expect(model.principles.length).to eq(2)
    end

    it 'returns a copy of the object without hidden ties and principles' do
      result = model.without_secrets
      # Assert that the returned object has no hidden ties and principles
      expect(result.ties.length).to eq(1)
      expect(result.principles.length).to eq(1)
      expect(result.ties[0]['hidden']).to be_falsey
      expect(result.principles[0]['hidden']).to be_falsey
    end
  end
end
