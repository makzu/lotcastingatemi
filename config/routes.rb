# frozen_string_literal: true

Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :player_token, only: [:show]
      resources :players, only: [:show]

      resources :chronicles, only: [:show, :create, :destroy, :update]

      resources :characters, only: [:show, :create, :destroy, :update] do
        resources :merits, :weapons, only: [:show, :create, :destroy, :update]
      end

      resources :qcs, only: [:show, :create, :destroy, :update] do
        resources :qc_merits, :qc_attacks, only: [:show, :create, :destroy, :update]
      end
    end
  end

  # All other routes go to the frontend:
  root to: 'site#index'
  get '*path', to: 'site#index'
end
