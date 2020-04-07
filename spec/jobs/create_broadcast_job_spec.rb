# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateBroadcastJob, type: :job do
  ActiveJob::Base.queue_adapter = :test

  it 'enqueues while making a character' do
    expect do
      create(:character)
    end.to have_enqueued_job(described_class)
  end
end
