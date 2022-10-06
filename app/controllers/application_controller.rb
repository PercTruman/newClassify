class ApplicationController < ActionController::API
  include ActionController::Cookies
before_action :authenticate_user

rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  private
  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) #find_by will return nil if not found, so you can generate exceptions. checks if we have a current_user stored; if not, make one
  end

  def authenticate_user
    render json: {errors: "Not Authorized"}, status: :unauthorized unless current_user #will throw an error unless a current_user exists. We aren't reading the @current_user variable, just seeing if there is one.
  end

  def render_not_found(error)
    render json: {errors: {error.model => "Not Found"}}, status: :not_found 
  end

  def render_unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors}, status: :unprocessable_entity
  end

end
