# frozen_string_literal: true

Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')

  namespace :api do
    namespace :v1 do
      post 'player_token' => 'player_token#create'
      resources :players, only: %i[index show update]

      resources :chronicles, only: %i[index create show update destroy] do
        member do
          post 'regen_invite_code'
          post 'remove_player/:player_id', action: :remove_player
        end
        post 'regen_invite_code', on: :member
        post 'join', on: :collection
      end

      resources :characters, only: %i[create show update destroy] do
        resources :merits, :weapons, :charms, :spells, only: %i[create show update destroy]
      end

      resources :qcs, only: %i[create show update destroy] do
        resources :qc_merits, :qc_attacks, :qc_charms, only: %i[create show update destroy]
      end

      resources :battlegroups, only: %i[create show update destroy] do
        resources :qc_attacks, only: %i[create show update destroy]
      end
    end
  end

  # All other routes go to the frontend:
  root to: 'site#index'
  get '*path', to: 'site#index'
end
