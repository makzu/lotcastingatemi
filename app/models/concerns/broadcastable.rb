# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module Broadcastable
  extend ActiveSupport::Concern
  included do
    after_create_commit :broadcast_create
    before_destroy :broadcast_destroy
    after_update_commit :broadcast_update

    def broadcast_update
      UpdateBroadcastJob.perform_later(
        all_ids,
        self,
        saved_changes.delete_if { |k| k == 'updated_at' || k == 'created_at' }
      )
    end

    def broadcast_create
      CreateBroadcastJob.perform_later(all_ids, self, parent)
    end

    def broadcast_destroy
      DestroyBroadcastJob.perform_later(all_ids, self, parent.entity_type, parent.id)
    end

    private

    def all_ids # rubocop:disable Metrics/AbcSize
      return [player.id] if chronicle.blank?
      return ([player.id] + [chronicle.st_id]).uniq if hidden

      ([player.id] + [chronicle.st_id] + chronicle.players.pluck(:id)).uniq
    end

    def parent
      return player if is_a?(Character) || is_a?(Qc) || is_a?(Battlegroup)
      character
    end
  end
end
