# frozen_string_literal: true

Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  post 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')

  get 'cypress_token', to: 'sessions#cypress_token' if Rails.env.cypress?

  namespace :api do
    namespace :v1 do
      post 'player_token' => 'player_token#create'
      delete 'players' => 'players#destroy'
      resources :players, only: %i[index show update]

      resources :chronicles, only: %i[index create show update destroy] do
        member do
          post 'regen_invite_code'
          post 'remove_player/:player_id', action: :remove_player
          post 'add_character/:character_id',     action: :add_character
          post 'add_qc/:qc_id',                   action: :add_qc
          post 'add_battlegroup/:battlegroup_id', action: :add_battlegroup
          post 'remove_character/:character_id',     action: :remove_character
          post 'remove_qc/:qc_id',                   action: :remove_qc
          post 'remove_battlegroup/:battlegroup_id', action: :remove_battlegroup
        end
        post 'join', on: :collection
      end

      resources :characters, only: %i[create show update destroy] do
        resources :merits, :weapons, :charms, :spells, only: %i[create show update destroy]
      end

      resources :qcs, only: %i[create show update destroy] do
        post 'duplicate', on: :member
        resources :qc_merits, :qc_attacks, :qc_charms, only: %i[create show update destroy]
      end

      resources :battlegroups, only: %i[create show update destroy] do
        post 'create_from_qc/:qc_id', on: :collection, action: :create_from_qc
        post 'duplicate', on: :member
        resources :qc_attacks, only: %i[create show update destroy]
      end

      resources :combat_actors, only: %i[create show update destroy]
    end
  end

  mount ActionCable.server, at: '/cable'

  # All other routes go to the frontend:
  root to: 'site#index'
  get '*path', to: 'site#index'
end
