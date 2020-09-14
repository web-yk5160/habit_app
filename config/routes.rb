Rails.application.routes.draw do
  root to: 'habits#index'
  devise_for :users
  resources :habits
  get 'categories', to: 'habits#habit_categories'
end
