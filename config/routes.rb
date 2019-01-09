Rails.application.routes.draw do
  resources :users do
    scope module: :users do
      resources :days
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
