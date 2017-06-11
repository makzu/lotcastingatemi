# frozen_string_literal: true

CRUD_ACTIONS = %i[create show update destroy].freeze

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # resources :player_token, only: [:show]
      post 'player_token' => 'player_token#create'
      resources :players, only: %i[index create show]

      resources :chronicles, only: CRUD_ACTIONS

      resources :characters, only: CRUD_ACTIONS do
        resources :merits, :weapons, only: CRUD_ACTIONS
      end

      resources :qcs, only: CRUD_ACTIONS do
        resources :qc_merits, :qc_attacks, only: CRUD_ACTIONS
      end
    end
  end

  # All other routes go to the frontend:
  root to: 'site#index'
  get '*path', to: 'site#index'
end
