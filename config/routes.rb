Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users
  resources :users do
    scope module: :users do
      resources :days
      resources :daily_targets
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
