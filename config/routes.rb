Rails.application.routes.draw do
  root to: 'habits#index'
  devise_for :users
  resources :habits do
    collection do
      get 'select_year', defaults: { format: 'json' }
    end
  end
  resources :categories, only: [:index, :show]
  get '/template/:id', to: 'habits#template', as: 'template'
  post '/template/:id', to: 'habits#new_template'
end
