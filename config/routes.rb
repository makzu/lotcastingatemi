# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # resources :player_token, only: [:show]
      post 'player_token' => 'player_token#create'
      resources :players, only: %i[index create show]

      resources :chronicles, only: %i[create show update destroy]

      resources :characters, only: %i[create show update destroy] do
        resources :merits, :weapons, only: %i[create show update destroy]
      end

      resources :qcs, only: %i[create show update destroy] do
        resources :qc_merits, :qc_attacks, only: %i[create show update destroy]
      end

      resources :battlegroups, only: %i[create show update destroy]
    end
  end

  # All other routes go to the frontend:
  root to: 'site#index'
  get '*path', to: 'site#index'
end
