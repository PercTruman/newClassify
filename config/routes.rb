Rails.application.routes.draw do
  get '/api/students', to: 'students#index'
  get '/api/users', to: 'users#index'
  get '/api/subjects', to: 'subjects#index'
  post '/subjects', to: 'subjects#create'
  get 'api/subjects/:id', to: 'subjects#show'
  get 'api/student_subjects', to: 'student_subjects#index'
  post '/student_subjects/:id', to: 'student_subjects#create'
  patch '/subjects/:id', to: 'subjects#update'
  delete '/subjects/:id', to: 'subjects#destroy'
  get 'api/teachers', to: 'teachers#index'
  post '/teacher', to: 'teachers#create'
  post '/student', to: 'students#create'
  post '/signup', to: 'users#create'
  post '/login',to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get 'api/me', to: 'users#me'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
