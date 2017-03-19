Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :characters, only: [:show, :create, :destroy, :update] do
        resources :merits, :weapons, only: [:index, :show, :create, :destroy, :update]
      end

      resources :qcs, only: [:show, :create, :destroy, :update] do
        resources :qc_merits, only: [:index, :show, :create, :destroy, :update]
      end
    end
  end


  root to: 'site#index'
end
