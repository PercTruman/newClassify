Rails.application.routes.draw do
  get '/api/students', to: 'students#index'
  get '/api/users', to: 'users#index'
  get '/api/subjects', to: 'subjects#index'
  post '/api/subjects', to: 'subjects#create'
  get '/api/subjects/:id', to: 'subjects#show'
  get '/api/student_subjects', to: 'student_subjects#index'
  post '/api/student_subjects/:id', to: 'student_subjects#create'
  patch '/api/subjects/:id', to: 'subjects#update'
  delete '/api/subjects/:id', to: 'subjects#destroy'
  get '/api/teachers', to: 'teachers#index'
  post '/api/teachers', to: 'teachers#create'
  post '/api/students', to: 'students#create'
  post '/api/signup', to: 'users#create'
  post '/api/login',to: 'sessions#create'
  delete '/api/logout', to: 'sessions#destroy'

  get 'api/me', to: 'users#me'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
