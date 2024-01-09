# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateBroadcastJob do
  it 'enqueues while making a character' do
    expect do
      create(:character)
    end.to have_enqueued_job(described_class)
  end
end
