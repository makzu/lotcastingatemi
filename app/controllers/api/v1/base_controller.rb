# frozen_string_literal: true

module Api
  module V1
    class BaseController < ActionController::API
      include Knock::Authenticable
      include Pundit
      serialization_scope :current_player

      before_action :authenticate_player
      before_action :setup_resource, except: %i[index create]

      after_action :verify_authorized

      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      def show
        authorize resource
        render json: resource
      end

      def update
        authorize resource
        if resource.update(resource_params)
          render json: resource, include: []
        else
          render json: resource.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize resource
        render json: resource.destroy
      end

      private

      def record_not_found
        render status: :not_found
      end

      def pundit_user
        current_player
      end

      def resource_params
        @resource_params ||= generic_params
      end

      def generic_params
        if respond_to?("#{resource_name}_params")
          send("#{resource_name}_params")
        elsif params[resource_class_sym].present?
          params.require(resource_class_sym).permit(resource_class.attribute_names - disallowed_attributes)
        end
      end

      def setup_resource(resource = nil)
        resource ||= resource_class.find(params[:id])
        instance_variable_set("@#{resource_name}", resource)
      end

      def resource
        instance_variable_get("@#{resource_name}")
      end

      def resource_name
        @resource_name ||= controller_name.singularize
      end

      def resource_class
        @resource_class ||= resource_name.classify.constantize
      end

      def resource_class_sym
        resource_class.name.underscore.to_sym
      end

      def base_attributes
        resource_class.attribute_names - disallowed_attributes
      end

      def disallowed_attributes
        %w[id character_id qc_id qc_attackable_id poisonable_id created_at updated_at]
      end

      # rubocop:disable Metrics/AbcSize
      def set_parent
        if params[:character_id]
          @parent = Character.find(params[:character_id])
        elsif params[:qc_id]
          @parent = Qc.find(params[:qc_id])
        elsif params[:battlegroup_id]
          @parent = Battlegroup.find(params[:battlegroup_id])
        elsif params[:combat_actor_id]
          @parent = CombatActor.find(params[:combat_actor_id])
        end
      end
      # rubocop:enable Metrics/AbcSize
    end
  end
end
