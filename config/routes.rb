Rails.application.routes.draw do
  get '/students', to: 'students#index'
  get '/users', to: 'users#index'
  get '/subjects', to: 'subjects#index'
  post '/subjects', to: 'subjects#create'
  get '/subjects/:id', to: 'subjects#show'
  patch '/subjects/:id', to: 'subjects#update'
  get '/teachers', to: 'teachers#index'
  post '/teachers', to: 'teachers#create'
  post '/students', to: 'students#create'
  post '/signup', to: 'users#create'
  post '/login',to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/me', to: 'users#me'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
