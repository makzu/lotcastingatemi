# frozen_string_literal: true

class SiteController < ApplicationController
  def index
    # Just render a view
    if params[:character]
      @character = Character.where(id: params[:id], public: true).pluck(:name, :description).first
    elsif params[:qc]
      @character = Qc.where(id: params[:id], public: true).pluck(:name, :description).first
    elsif params[:battlegroup]
      @character = Battlegroup.where(id: params[:id], public: true).pluck(:name, :description).first
    end
  end
end
