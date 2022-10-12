Rails.application.routes.draw do
  get '/students', to: 'students#index'
  get '/users', to: 'users#index'
  get '/teachers', to: 'teachers#index'
  get '/subjects', to: 'subjects#index'
  get '/subjects/:id', to: 'subjects#show'
  get '/me', to: 'users#show'
  get '/student_subjects', to: 'student_subjects#index'

  post '/subjects', to: 'subjects#create'
  post '/student_subjects/:id', to: 'student_subjects#create'
  post '/teachers', to: 'teachers#create'
  post '/students', to: 'students#create'
  post '/signup', to: 'users#create'
  post '/login',to: 'sessions#create'

  patch '/subjects/:id', to: 'subjects#update'

  delete '/subjects/:id', to: 'subjects#destroy'
  delete '/logout', to: 'sessions#destroy'

  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
