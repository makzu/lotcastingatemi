# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module Broadcastable
  extend ActiveSupport::Concern
  included do
    after_create :broadcast_parent
    after_destroy :broadcast_parent
    after_update_commit :broadcast_update

    def broadcast_update
      # Do not broadcast if the parent character is being deleted
      # This is to prevent Charms, Merits, etc from sending their own individual
      # destroy messages when a whole character is being deleted
      return if trait? && character.destroyed?

      UpdateBroadcastJob.perform_later(
        all_ids,
        self,
        saved_changes.delete_if { |k| k == 'updated_at' }
      )
    end

    def broadcast_parent
      return if trait? && character.destroyed?

      UpdateBroadcastJob.perform_later all_ids, which_parent, (saved_changes.delete_if { |k| k == 'updated_at' })
    end

    private

    def all_ids # rubocop:disable Metrics/AbcSize
      return [player.id] if chronicle.blank?
      return ([player.id] + [chronicle.st_id]).uniq if hidden

      ([player.id] + [chronicle.st_id] + chronicle.players.pluck(:id)).uniq
    end

    def which_parent
      return character if trait?
      return chronicle if chronicle.present?
      player
    end

    def trait?
      !is_a?(Character) && !is_a?(Qc) && !is_a?(Battlegroup)
    end
  end
end
