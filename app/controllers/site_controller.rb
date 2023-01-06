# frozen_string_literal: true

class SiteController < ApplicationController
  def index
    return unless %w[characters qcs battlegroups].include? params[:char]

    klass = params[:char].classify.constantize
    @title, @description, @image =
      klass
      .where(id: params[:id], public: true)
      .pick(:name, :description, :portrait_link)
  end
end
