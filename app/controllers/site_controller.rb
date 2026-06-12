# frozen_string_literal: true

class SiteController < ApplicationController
  def index
    return unless %w[characters qcs battlegroups].include? params[:char]

    klass = case params.expect(:char)
            when 'characters'
              Character
            when 'qcs'
              Qc
            when 'battlegroups'
              Battlegroup
            end

    @title, @description, @image =
      klass
      .where(id: params[:id], public: true)
      .pick(:name, :description, :portrait_link)
  end
end
