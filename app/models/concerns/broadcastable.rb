# frozen_string_literal: true

# Methods to broadcast changes to other sessions (and players) via ActionCable
module Broadcastable
  extend ActiveSupport::Concern
  included do
    after_create_commit :broadcast_create
    before_destroy :broadcast_destroy
    after_update_commit :broadcast_update

    def broadcast_update
      changes = saved_changes.dup

      # To prevent an ActiveJob::SerializationError, the timestamps must be
      #  strings and not Time objects
      if changes['updated_at']
        changes['updated_at'].map!(&:to_s)
      else
        changes['updated_at'] = ['', updated_at.to_s]
      end
      changes['created_at']&.map!(&:to_s)

      UpdateBroadcastJob.perform_later all_ids, self, changes
    end

    def broadcast_create
      CreateBroadcastJob.perform_later(all_ids, self, parent)
    end

    def broadcast_destroy
      DestroyBroadcastJob.perform_later(all_ids, self, parent.entity_type, parent.id, chron_id)
    end

    private

    def all_ids
      return [player.id] if chronicle.blank?
      return ([player.id] + [chronicle.st_id]).uniq if hidden

      ([player.id] + [chronicle.st_id] + chronicle.players.pluck(:id)).uniq
    end

    def parent
      if is_a?(Character) || is_a?(Qc) || is_a?(Battlegroup) || is_a?(CombatActor)
        return player
      end

      character
    end

    def chron_id
      if is_a?(Character) || is_a?(Qc) || is_a?(Battlegroup) || is_a?(CombatActor)
        return chronicle_id
      end

      nil
    end
  end
end
